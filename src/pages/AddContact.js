import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AddContact = () => {
    const [data,setData] = useState({token:localStorage.getItem('token')});
    const navigate = useNavigate();
    const {ContactID} = useParams();
    useEffect(()=>{
        if(ContactID!=null){
            
                fetch("http://localhost:3000/contacts/"+ContactID,{
                    method:"POST",
                    body:JSON.stringify({token:localStorage.getItem('token')}),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then(res=>res.json())
                .then(res=>{
                    console.log(res);
                    setData({...data,...res.data});

                });
            
        }
    },[]);
  return (
    <>
        <table>
            <tr>
                <td>Enter ContactName</td>
                <td><input value={data.ContactName} type='text' name="ContactName" onChange={(e)=>{
                    setData({...data,[e.target.name]:e.target.value})
                }}/></td>
            </tr>
            <tr>
                <td>Enter ContactMobile</td>
                <td><input value={data.ContactMobile} type='text' name="ContactMobile" onChange={(e)=>{
                    setData({...data,[e.target.name]:e.target.value})
                }}/></td>
            </tr>
            <tr>
                <td>Enter ContactEmail</td>
                <td><input value={data.ContactEmail} type='text' name="ContactEmail" onChange={(e)=>{
                    setData({...data,[e.target.name]:e.target.value})
                }}/></td>
            </tr>
            <tr>
                <td colSpan={2}>
                    { ContactID==null && <button onClick={()=>{
                        fetch("http://localhost:3000/contacts/add",{
                            method:"POST",
                            body:JSON.stringify(data),
                            headers:{
                                'Content-Type':"application/json"
                            }
                        })
                        .then(res=>res.json())
                        .then(res=>{
                            navigate("/dashboard");
                        });
                    }}>Add Contact</button>}
                    { ContactID!=null && <button onClick={()=>{
                        fetch("http://localhost:3000/contacts/edit/"+ContactID,{
                            method:"PUT",
                            body:JSON.stringify(data),
                            headers:{
                                'Content-Type':"application/json"
                            }
                        })
                        .then(res=>res.json())
                        .then(res=>{
                            navigate("/dashboard");
                        });
                    }}>Edit Contact</button>}
                </td>
            </tr>
        </table>
    </>
  )
}

export default AddContact