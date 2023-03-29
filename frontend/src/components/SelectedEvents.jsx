import React, { useContext, useEffect,useState } from "react";

import {
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
// import { useNavigate } from "react-router-dom";
import ProductContext from "./context/ProductContext";
import event1 from "./eventImages/event1.jpg";
import event2 from "./eventImages/event2.jpg";
import event3 from "./eventImages/event3.jpg";
import event4 from "./eventImages/event4.jpg";
import axios from "axios";
// import Products from "./Events";

export const truncate = (str,n)=>{
    return String(str).length>n? String(str).substring(0,n-1)+"...":str
}

const ProductsInCart = () => {
  const { basket, setBasket,count,setCount} = useContext(ProductContext);
  const arr=[event1,event2,event3,event4];
  const [vendorName,setVendorName]=useState([]);

  useEffect(()=>{
    axios.get("https://event-proposal-page-dp1n.onrender.com/vendorDetails").then((res) => {
      setVendorName(res.data.data[res.data.data.length-1])})
  })
  // const navigate=useNavigate();
  // let aggregate=basket.reduce((prevVal,currVal)=>{
  //   return prevVal+currVal?.gamePrice
  // },0)

  const removeFromCart=(i)=>{
    const newCartList=basket.filter((x,index)=>index!==i)
    setBasket([...newCartList]);
    setCount(count-1);
  }

  return (
      <MDBRow>
        {basket[0]?<h4 style={{margin:"15px"}}>Selected</h4>:``}
        
        <MDBCol md={12} lg={6}>
          {basket?.length === 0 ? (
            <div>


            </div>


          ) : (
            basket?.map((_,index) => (
              <div>
                <div>
                  <div key={index}
                    style={{
                      boxShadow:"0px 3px 6px #00000029",
                      borderRadius:"4px",
                      margin: "10px",
                      height: "300px",
                      width: "267px",
                    }}
                  >
                    <div>
                     <img
                        src={arr[0]}
                        alt="abcd"
                        height={200}
                        width={267}
                        style={{borderRadius:"4px"}}
                      />
                    </div>
                    <div style={{paddingLeft:"10px"}}>{vendorName.vendorName}</div>
                    <div style={{paddingTop:"15px",paddingLeft:"10px"}}>{_?.budget}/-</div>
                    <div style={{paddingLeft:"10px"}}>{_?.placeOfEvent}</div>
                    <button style={{ cursor: "pointer", background:"white",border:"0px solid black",marginLeft:"240px" }} onClick={()=>removeFromCart(index)}>X</button>
                  </div>
                </div>
              
                  
              </div>
            ))
          )}
        </MDBCol>
      </MDBRow>
  );
};

export default ProductsInCart;
