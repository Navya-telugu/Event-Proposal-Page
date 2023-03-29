import React,{useState,useEffect} from "react";
import "./header.css";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
const Header = (props) => {
  const [showLogout, setShowLogout] = useState(false);
  
  const handleAvatarClick = () => {
    setShowLogout(!showLogout);
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; 
  };
  console.log(props.value);
  const [vname,setVname]=useState("");
  useEffect(() => {
    async function getProductDetails() {
      await axios.get(`https://event-proposal-page-dp1n.onrender.com/vendorDetails`).then((res) => {
            setVname(res.data.data[res.data.data.length-1].vendorName)
      });
      
    }
    getProductDetails();
  }, [props.value]);

  

  return (
    <>
      <section className="icons-container">
        <h1>LOGO</h1>
        <section className="vender-box">
          <span>{vname ? vname : "VendorName"}</span>
          <span>
            {" "}
            <FaUserCircle onClick={handleAvatarClick} style={{cursor:"pointer"}} size={35}/>
          </span>
          {showLogout && <button style={{marginLeft:"10px",marginTop:"25px",height:"25px",width:"55px",backgroundColor:"skyblue",borderRadius:"4px",border:"0px solid"}} onClick={handleLogoutClick}>Logout</button>}
        </section>
      </section>
    </>
  );
};
export default Header;
