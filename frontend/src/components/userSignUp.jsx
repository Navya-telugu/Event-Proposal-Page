import React,{useState} from "react";
import "./vendorsignup.css";
import "./usersignin.css";
import axios from "axios";

const UserSignUp = (props) => {
  const [data, setData] = useState({});
  const [msg,setErrormsg]=useState("");
  const [msg1,setErrormsg1]=useState("");
  
  const handleSignUp = (e) => {
    e.preventDefault();
    props.onSignUpSuccess();
  };
  function handleSubmit(e) {
    e.preventDefault();

    if (!data.contact || !data.name || !data.email || !data.password) {
      setErrormsg("Kindly Fill all the details");
    }
    if(data.password!==data.confirmPassword){
      setErrormsg("Password and Confirm Password no match");
    }
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios.post("https://event-proposal-page-dp1n.onrender.com/userRegister", data, config).then((res) => {
      setData({});
    setErrormsg1("Registration Done Go and SignIn");
    if(res.data.status==="failed"){
      setErrormsg("Contact already exists please go and signin");
    }
    })
    .catch((e)=>{
      console.log(e.response.data.status);
    })

  }

  return (
    <div className="box1">
      <h4 id="SignUp-Heading">Register in your Account</h4>
      <span id="errMsg-12">{msg}</span>
      <span id="errmessage11">{msg1}</span>
      <form id="form">
        <input type="text" placeholder="Name" id="user-name"
        value={data.name || ""}
        onChange={(e) => setData({ ...data, name: e.target.value },setErrormsg(""),setErrormsg1(""))}
        /><br/>
        <input type="email" placeholder="Email" id="user-email"
        value={data.email || ""}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        /><br/>
        <input type="text" placeholder="Contact" id="userContact"
        value={data.contact || ""}
        onChange={(e) => setData({ ...data, contact: e.target.value })}
        /><br/>
        <input type="password" placeholder="Password" id="user-passowrd"
        value={data.password || ""}
        onChange={(e) => setData({ ...data, password: e.target.value },setErrormsg(""))}
        /><br/>
        <input type="password" placeholder="Confirm Password" id="user-conPassword"
        value={data.confirmPassword || ""}
        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        /><br/>
        <button type="submit" id="user-btn2" onClick={handleSubmit}>REGISTER</button>
      </form>
      <i class="fa-thin fa-arrow-left-long"></i>
        <span onClick={handleSignUp} id="signin-btn2">SignIn</span>
    </div>
  );
};

export default UserSignUp;
