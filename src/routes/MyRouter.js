import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home.js'
import Login from '../pages/Login.js';
import Register from '../pages/Register.js'
import YouthCreate from '../pages/YouthCreate.js'
import YouthEdit from '../pages/YouthEdit.js'


function MyRouter(){



    return(
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/youth/create" element={<YouthCreate />}/>
            <Route path="/youth/:id/edit" element={<YouthEdit />}/>
    
        </Routes>
        
    )
}
export default MyRouter;