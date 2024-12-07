import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [data, setData]= useState({});
    const navigate = useNavigate();
  return (
    <>
        <table>
            <tr>
                <td>
                    Enter Username
                </td>
                <td>
                    <input type='text' onChange={(e)=>{
                        setData({...data,UserName:e.target.value})
                    }} />
                </td>
            </tr>
            <tr>
                <td>
                    Enter Password
                </td>
                <td>
                    <input type='password'  onChange={(e)=>{
                        setData({...data,Password:e.target.value})
                    }} />
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <button onClick={()=>{
                        fetch("http://localhost:3000/signup",{
                            method:"POST",
                            body:JSON.stringify(data),
                            headers:{
                                'Content-Type':"application/json"
                            }
                        })
                        .then(res=>res.json())
                        .then(res=>{
                            navigate("/");
                        });
                    }}>Signup</button>
                </td>
            </tr>
        </table>
    </>
  )
}

export default Signup