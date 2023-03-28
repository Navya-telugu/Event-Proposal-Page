import React,{useState} from "react";
import "./vendorsignup.css";
import axios from "axios";

const VendorSignUp = (props) => {
  const [data, setData] = useState({});
  const [msg,setErrormsg]=useState("");
  const [msg1,setErrormsg1]=useState("");
  
  const handleSignUp = (e) => {
    e.preventDefault();
    props.onSignUpSuccess();
  };
  function handleSubmit(e) {
    e.preventDefault();

    if (!data.contact || !data.vendorName || !data.email || !data.password) {
      setErrormsg("Kindly Fill all the details");
    }
    if(data.password!==data.confirmPassword){
      setErrormsg("Password and Confirm Passowrd are not matching");
    }
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios.post("http://localhost:8080/register", data, config).then((res) => {
      setData({})
      setErrormsg1("Registration Done Go and SignIn")
    })
    .catch((e)=>{
      console.log(e.response.data.status);
        if(e.response.data.status==="fail"){
          setErrormsg("Contact already exists please go and signin");
        }
    })

  }

  return (
    <div className="box1">
      <h4 id="SignUp-Heading">Register in your Account</h4>
      <span id="errMsg-1">{msg}</span>
      <span id="errmessage">{msg1}</span>
      <form id="form">
        <input type="text" placeholder="Name" id="vendor-name"
        value={data.vendorName || ""}
        onChange={(e) => setData({ ...data, vendorName: e.target.value },setErrormsg(""),setErrormsg1(""))}
        /><br/>
        <input type="email" placeholder="Email" id="vendor-email"
        value={data.email || ""}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        /><br/>
        <input type="text" placeholder="Contact" id="vendorContact"
        value={data.contact || ""}
        onChange={(e) => setData({ ...data, contact: e.target.value })}
        /><br/>
        <input type="password" placeholder="Password" id="vendor-passowrd"
        value={data.password || ""}
        onChange={(e) => setData({ ...data, password: e.target.value },setErrormsg(""))}
        /><br/>
        <input type="password" placeholder="Confirm Password" id="vendor-conPassword"
        value={data.confirmPassword || ""}
        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        /><br/>
        <button type="submit" id="vendor-btn2" onClick={handleSubmit}>REGISTER</button>
      </form>
      <i class="fa-thin fa-arrow-left-long"></i>
      
        <span onClick={handleSignUp} id="signin-btn">SignIn</span>
      
    </div>
  );
};

export default VendorSignUp;
