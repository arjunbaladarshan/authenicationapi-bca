import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom';

const Home = () => {
    const localToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [searchText,setSearchText]= useState("");

    useEffect(()=>{
        if(localToken==null){
            navigate("/");
        }

        if(searchText!=""){
            fetch("http://localhost:3000/contacts/search/"+searchText,{
                method:"POST",
                body:JSON.stringify({
                    token:localToken
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(res=>{
                setContacts(res.data);
            });
        }
        else{
            fetch("http://localhost:3000/contacts",{
                method:"POST",
                body:JSON.stringify({
                    token:localToken
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(res=>{
                setContacts(res.data);
            });
        }
        

    },[isUpdated,searchText]);

    const foramtedContact = contacts.map((con)=>{
        return(
                <tr>
                    <td>
                        {con.ContactName}
                    </td>
                    <td>
                        {con.ContactMobile}
                    </td>
                    <td>
                        {con.ContactEmail}
                    </td>
                    <td>
                        <button className='btn btn-warning' onClick={()=>{
                            navigate("/contact/edit/" + con.ContactID)
                        }}>Edit</button>
                    </td>
                    <td>
                        <button className='btn btn-danger' onClick={()=>{
                            fetch("http://localhost:3000/contacts/delete/"+con.ContactID,{
                                method:"POST",
                                body:JSON.stringify({token:localToken, ContactID:con.ContactID}),
                                headers:{
                                    "Content-Type":"application/json"
                                }
                            })
                            .then(res=>res.json())
                            .then(res=>{
                                setIsUpdated(!isUpdated);
                            });
                        }}>Delete</button>
                    </td>
                </tr>
        );
    })

    return (
        <>
            <div className='row'>
                <div className='col'>Home</div>
                <div className='col-3'>
                    <button className='btn btn-warning' onClick={()=>{
                        localStorage.removeItem('token');
                        navigate("/");
                    }}>Logout</button>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <input type='text' onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}/>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <table border={1}>
                        {foramtedContact}
                    </table>
                </div>
                <div className='col-2'>
                    <button onClick={()=>{
                        navigate("/contact/add")
                    }}>Add Contact</button>
                </div>
            </div>
            
        </>
        
    )

}

export default Home