import React, { useEffect, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
//import ProductContext from "./context/ProductContext";
import ProductsInCart from "./SelectedEvents";
import "./userComponents/Home.css";
import event1 from "./eventImages/event1.jpg";
import event2 from "./eventImages/event2.jpg";
import event3 from "./eventImages/event3.jpg";
import event4 from "./eventImages/event4.jpg";
import event5 from "./eventImages/event5.jpg";
import event6 from "./eventImages/event6.jpg";
import event7 from "./eventImages/event7.jpg";
import event8 from "./eventImages/event8.jpg";
import event9 from "./eventImages/event9.jpg";
import axios from "axios";
import UserHeader from "./headers/userHeader";



const Products = ({ items }) => {
  const arr=[event1,event2,event3,event4,event5,event6,event7,event8,event9];
  const [vendorName,setVendorName]=useState([]);
  //const token = `Bearer ${localStorage.getItem("token")}`;///
  const navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("token") === null) {
      alert("Please login first");
      navigate("/");
    }else{
      axios.get("http://localhost:8080/vendorDetails").then((res) => {
      setVendorName(res.data.data[res.data.data.length-1]);
    });
    }
    
  },[navigate])
  return (
    <>
    <UserHeader/>
    <section className="top-background"></section>
      {<ProductsInCart/>}
      <div className="main-section">
        
        <h2 className="heading" style={{marginLeft:"20px"}}>Proposals</h2>
        <section className="cards-container">
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "20% 20% 20% 20% 20%",
              margin: "40px",
            }}
          >
            {items.map((x, i) => {
              return (
                <div>
                  <div key={i}
                    style={{
                      boxShadow:"0px 3px 6px #00000029",
                      borderRadius:"4px",
                      margin: "10px",
                      height: "300px",
                      width: "267px",
                    }}
                  >
                    <div>
                     <Link to={`/product/${x?._id}`}>
                     <img
                        src={arr[Math.floor(Math.random() * 9)]}
                        alt="abcd"
                        height={200}
                        width={267}
                        style={{borderRadius:"4px"}}
                      />
                     </Link>
                    </div>
                    <div style={{paddingLeft:"10px"}}>{vendorName.vendorName}</div>
                    <div style={{paddingTop:"15px",paddingLeft:"10px"}}>{x.budget}/-</div>
                    <div style={{paddingLeft:"10px"}}>{x.placeOfEvent}</div>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </div>
    </>
  );
};

export default Products;
