import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductContext from "./context/ProductContext";
import axios from "axios";
import UserHeader from "./headers/userHeader";
import event1 from "./eventImages/event1.jpg";
import event2 from "./eventImages/event2.jpg";
import event3 from "./eventImages/event3.jpg";
import event4 from "./eventImages/event4.jpg";

const ProductDetails = () => {
  const { product, setProduct, count, setCount, basket, setBasket } =
    useContext(ProductContext);
  const arr = [event1, event2, event3, event4];
  const [vendorName, setVendorName] = useState([]);
  const [eventImages,setImages]=useState();
  const { id } = useParams();

  const handleSubmit = () => {
   {basket?console.log("delete previous one"):
      setCount(count+1) ;
      setBasket([product]);}
  };

  console.log(eventImages);
  useEffect(() => {
    axios.get("http://localhost:8080/vendorDetails").then((res) => {
      setVendorName(res.data.data[0]);
    });
    async function getProductDetails() {
      await axios.get(`http://localhost:8080/users/${id}`).then((res) => {
        setProduct(res.data.data[0]);
      setImages(res.data.data[0].images)
      });
    }
    getProductDetails();
  }, [id, setProduct]);
 

  return (
    <>
      <UserHeader />
      <div style={{ margin: "25px" }}>
        <Link to="/home">
        <i class="fa-regular fa-trash"></i>
          <button
            onClick={() => handleSubmit()}
            style={{
              marginLeft: "1400px",
              marginBottom: "5px",
              background: "white",
              color: "blue",
              border: "1px solid blue",
              height: "25px",
              width: "80px",
            }}
          >
            SELECT
          </button>
        </Link>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            size={12}
            lg={4}
            id="firstCol"
            style={{
              boxShadow: "0px 3px 6px #00000029",
              width: "420px",
              height: "400px",
              marginRight: "8px",
            }}
          >
            <img
              src={arr[0]}
              alt="game"
              style={{ height: "180px", width: "370px" }}
            />
           <p style={{marginLeft:"10px"}}>
           Name : {vendorName.vendorName} <br />
            Email : {vendorName.email}
           </p>
            <div style={{ display: "flex", justifyContent: "space-between",marginLeft:"5px",marginRight:"12px"}}>
              <p>
                Start Date : <strong>{product?.fromDate}</strong>
              </p>
              <p>
                End Date: <strong>{product?.toDate}</strong>
              </p>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginLeft:"12px",marginRight:"14px"}}>
              <div>
              <h5>Event Type</h5>
              <p
                style={{ background: "#D9ECFF", width: "75px", padding: "3px",color:"#006BD9",marginTop:"-20px" }}
              >
                {product?.eventType}
              </p>
              </div>
              <div>
              <h5>Event Class</h5>
              <p style={{marginTop:"-13px"}}>Class A</p>
              </div>
            </div>
          </div>
          <div
            style={{
              border: "1px solid #EDEDED",
              display: "flex",
              flexDirection: "column",
              marginRight: "8px",
              width: "500px",
              padding: "20px",
            }}
            id="thirdCol"
          >
            <b>Venue and Arrangements</b>
            <ul style={{ listStyle: "none",color:"#767676" }}>
              <li  style={{margin:"4px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever</li>
              <li  style={{margin:"4px"}}>Location</li>
              <li  style={{margin:"4px"}}>Parking</li>
              <li  style={{margin:"4px"}}>Capacity and Minimums</li>
              <li  style={{margin:"4px"}}>Contract Flexibility and Force Majeure</li>
              <li  style={{margin:"4px"}}>Services and Amenities</li>
              <li  style={{margin:"4px"}}>Layout</li>
            </ul>
          </div>
          <div
            style={{
              border: "1px solid #EDEDED",
              width: "660px",
              padding: "20px",
            }}
          >
            <b>Food Preferences</b>
            <ul style={{ listStyle: "none" }}>
              <li style={{color:"#767676"}}>{product?.foodPreferences}</li>
            </ul>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              height: "350px",
              width: "390px",
              border: "1px solid #EDEDED",
              margin: "5px",
              marginLeft: "-10px",
              padding: "20px",
            }}
          >
          <div style={{display:"flex",flexDirection:"column"}}>
          <div>
           <b>My Albums</b>
           </div>
            {/* {eventImages.map((x,i)=>{
              return(
                <div>
                  <img src={arr[0]} alt="eventImage" style={{margin:"10px"}} height={100} width={100}/>
                </div>
              )
            })} */}
            <div>
            <img src={arr[Math.floor(Math.random() * 2)]} alt="eventImage" style={{margin:"10px"}} height={100} width={100}/>
            <img src={arr[Math.floor(Math.random() * 4)]} alt="eventImage" style={{margin:"10px"}} height={100} width={100}/>
            </div>
          </div>
          </div>
          <div
            style={{
              height: "250px",
              width: "500px",
              border: "1px solid #EDEDED",
              margin: "5px",
              marginLeft: "5px",
              padding: "20px",
            }}
          >
            <b>Contacts</b>
            <div style={{marginTop:"79px",display:"flex",justifyContent:"space-between"}}>
              <div>
              <div style={{border:"0px solid black",height:"50px",width:"50px",background:"lightgrey", borderRadius:"50px",marginLeft:"35px"}}></div>
              <b style={{color:"#767676"}}>+91 xxxxxxxxxx</b>
              </div>
              <div>
              <div style={{border:"0px solid black",height:"50px",width:"50px",background:"lightgrey", borderRadius:"50px",marginLeft:"35px"}}></div>
              <b style={{color:"#767676"}}>+91 xxxxxxxxxx</b>
              </div>
              <div>
              <div style={{border:"0px solid black",height:"50px",width:"50px",background:"lightgrey", borderRadius:"50px",marginLeft:"35px"}}></div>
              <b style={{color:"#767676"}}>+91 xxxxxxxxxx</b>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "250px",
              width: "630px",
              border: "1px solid #EDEDED",
              margin: "5px",
              marginLeft: "5px",
              padding: "20px",
            }}
          >
            <b>Events</b>
            <ul style={{ listStyle: "none",color:"#767676" }}>
              <li>{product?.events}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
