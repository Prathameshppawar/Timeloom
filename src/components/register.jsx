import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import './styles/signup.css'
const host = "http://localhost:5500";





const register=()=> {
  let navigate=useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState('')
  const emailChange=(e)=>{
    setemail(e.target.value)
    console.log(email)
  };

  const [password, setpassword] = useState('')
  const passwordChange=(e)=>{
    setpassword(e.target.value)
    console.log(password)
  };
  
  const [name, setname] = useState('')
  const nameChange=(e)=>{
      setname(e.target.value)
      console.log(name)
  };

  const [id, setid] = useState('')
  const idChange=(e)=>{
      setid(e.target.value)
      console.log(id)
  };

  const handleClick = async (e) => {
    console.log(e)
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${host}/registerUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          institute_id: id
        }),
      });
      const json = await response.json();
      console.log(json);
      if (response.status === 200) {
        // loginSuccess();
        setLoading(false);
        //save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/home");
      } else {
        // loginFail();
        setLoading(false);
      }
    } catch (error) {
      // serverError();
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };



    return (
        <>
          {loading && (
            <div className="w-full h-full bg-black/60 absolute z-40">
              <div className="absolute z-50 translate-x-1/2 translate-y-1/2 bottom-1/2 right-1/2">
                <ThreeCircles
                  height="100"
                  width="100"
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperclass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor="#FFC300"
                  innerCircleColor="#ffffff"
                  middleCircleColor="#fe3a95"
                />
              </div>
              <div className="absolute z-50 translate-x-1/2 translate-y-1/2 bottom-60 right-1/2 text-center text-white" style={{color:'white'}}>
                Rome wasn't built in a day, and neither was this server! <br />
                Enjoy the suspenseful wait ...
              </div>
            </div>
          )}
            <div>
              <video className="vedio" id="myVideo" width="1500" height="830" autoPlay muted loop>
                  <source src="video/bg.mp4" type="video/mp4" />
              </video>
              <div className="container">
                <div className="header">
                    Timeloom
                </div>
                <div className="loda"> 
                  {/* <form action="submit" method="POST" onSubmit={handleClick}> */}
                  <div>
                    <input type="text" className="name" placeholder="name" value={name} onChange={nameChange} />     
                  </div>
                  <div>
                      <input type="text" className="iid" placeholder="institute id" value={id} onChange={idChange} />
                  </div>
                  <div>
                      <input type="email" className="email1" placeholder="email" value={email} onChange={emailChange} required />
                  </div>
                  <span>
                      <input type="password" className="password1" placeholder="password" value={password} onChange={passwordChange} required />
                  </span>
                  <div className="t">
                      <input type="submit" value="sign up" className="signbutt" onClick={handleClick} disabled={loading} />
                  </div>
                </div>
              </div>
            </div>
        </>
      );
}
export default register