import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({UserName:"", Password:""});
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token")!=null){
            navigate("/dashboard");
        }
    },[]);

    return (
        <>
            <table>
                {errorMsg!="" && <tr>
                    <td colSpan={2}>
                        <h3 style={{color:"red"}}>{errorMsg}</h3>
                    </td>
                </tr>}
                <tr>
                    <td>Enter Username</td>
                    <td><input type='text' value={data.UserName} onChange={(e)=>{
                        setData({...data, UserName:e.target.value});
                    }} /></td>
                </tr>
                <tr>
                    <td>Enter Password</td>
                    <td><input type='text' value={data.Password} onChange={(e)=>{
                        setData({...data, Password:e.target.value});
                    }} /></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button onClick={()=>{
                            fetch("http://localhost:3000/login",{
                                method:"POST",
                                body:JSON.stringify(data),
                                headers:{
                                    'Content-Type':'application/json'
                                }
                            })
                            .then(res=>res.json())
                            .then(res=>{
                                if(res.sucess){
                                    localStorage.setItem("token",res.token);
                                    navigate("/dashboard")
                                }
                                else{
                                    setErrorMsg("username/password does not match")
                                }
                            })
                        }}>Login</button>
                    </td>
                </tr>
            </table>
            <Link to="/signup">Signup</Link>
        </>
    )
}

export default Login