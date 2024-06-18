import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/loading.js"
import CheckAuth from "../routes/CheckAuth.js"
import MessageModal from "../components/message_modal.js"

function YouthCreate(){ 
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const token = localStorage.getItem('token')
    const[loading,setLoading]=useState(false)
    if(!token){
        CheckAuth()
    }
    
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [inputErrorList, setInputErrorList] = useState({})
    const [youth, setYouth] = useState({
        name:'',
        address:'',
        contact_no:'',
        school:''
    })

    const handleInput= (e) =>{
        e.persist();
        setYouth({...youth,[e.target.name]:e.target.value});
    }

    const addYouth= (e) =>{
        e.preventDefault();
        setLoading(true);

        console.log(youth)

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }    

    axios.post(`/api/youth/${user.id}/create`,youth,config).then(res=>{
            setModalMessage(res.data.message);
            setShowModal(true);
            setInputErrorList('')
            window.location.href='/'
            setLoading(false)
        }).catch(function(error){
            if(error.response.status===422){
                setInputErrorList(error.response.data.errors)
                setLoading(false)
            }

            if(error.response.status===500){
                alert(error.response.data)
                setLoading(false);
            }
        });
    }

    if(loading){
        return(
            <Loading />
        )
    }
    return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Record
                                    <Link to="/" className="btn btn-primary float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={addYouth}>
                                    <div className="mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" name="name" value={youth.name} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.name}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" id="address" name="address" value={youth.address} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.address}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="contact_no">Contact No.<small>(11 digits, ex. 0928.......)</small></label>
                                        <input type="number" id="contact_no" name="contact_no" value={youth.contact_no} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.contact_no}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="school">School</label>
                                        <input type="text" id="school" name="school" value={youth.school} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.school}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Add Record</button>
                                    </div>
                                </form>
                                <MessageModal show={showModal} message={modalMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default YouthCreate;