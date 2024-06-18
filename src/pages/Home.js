import { Link } from "react-router-dom"
import Loading from "../components/loading.js"
import { useEffect, useState } from "react"
import axios from "axios"
import MessageModal from "../components/message_modal.js"

function Home(){
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const token = localStorage.getItem('token')
    const[loading,setLoading]=useState(true)
    const [youths,setYouths]=useState([])
    
    useEffect(() => {
            axios.get('/api/youths').then(res => {
                console.log(res);
                setYouths(res.data.youths);
                setLoading(false);
            }).catch(error => {
                console.error(error);
                setLoading(false);
            });
        
    }, []);

    const deletePost = (e, id)=>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.delete(`/api/youth/${id}/destroy`,config).then(res=>{
            setModalMessage(res.data.message);
            setShowModal(true);
            thisClicked.closest("tr").remove();
        }).catch(function(error){
            if(error.response.status===404){
                alert(error.response.data.errors)
                thisClicked.innerText="Delete";
            }

            if(error.response.status===500){
                alert(error.response.data)
            }
        });
    }

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(youths);


    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredData(youths);
        } else {
            const filtered = youths.filter((item) =>
                Object.values(item).some((value) =>
                    value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, youths]);

    var trDetails=""
    var cardHeader=""
    var tHead=""

    if(JSON.parse(sessionStorage.getItem('user'))){
        tHead=(
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Conntact  No.</th>
                <th scope="col">School</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        )

        trDetails= filteredData.map((item, index)=>{
            return(
                <tr key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.contact_no}</td>
                    <td>{item.school}</td>
                    <td><Link to={`/youth/${item.id}/edit`} className="btn btn-success">Edit</Link></td>
                    <td><button type="button" onClick={(e)=>deletePost(e,item.id)} className="btn btn-danger ">Delete</button></td>
                </tr>
            )
        })

        cardHeader=(
            <div className="card-header">
                <h4>Youth
                    <Link to="/youth/create" className="btn btn-primary float-end">Add Record</Link>
                </h4>
            </div>
        )
    }else{
        tHead=(
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Conntact  No.</th>
                    <th scope="col">School</th>
                </tr>
        )
        trDetails= filteredData.map((item, index) => (
            <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.contact_no}</td>
                <td>{item.school}</td>
            </tr>
        ))

        cardHeader=(
            <div className="card-header">
                <h4>Youth</h4>
            </div>
        )
    } 

    if(loading){
        return(
            <Loading />
        )
    }



    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                    {cardHeader}
                        <div className="card-body">
                        <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    {tHead}
                                </thead>
                                <tbody>
                                {trDetails}
                                </tbody>
                            </table>
                            <MessageModal show={showModal} message={modalMessage} />
                        </div>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;