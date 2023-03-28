import VendorSignIn from './components/vendorsignin';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ProposalsData from './components/VenderProposals/ProposalsData';
import ProposalsForm from './components/VenderProposals/ProposalsForm';
import ProductDetails from './components/EventDetails';
import Products from './components/Events';
import ProductsInCart from './components/SelectedEvents';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {
  const [items,setItems]=useState([]);

  useEffect(()=>{
    
    async function getAllProducts(){
      axios.get("http://localhost:8080/proposalsData").then((res)=>{
        setItems(res.data.data)
        console.log(res.data.data);
      })
    }
    getAllProducts()
  },[])
  return (
  <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<VendorSignIn/>}/>
          <Route path="/proposalsData/" element={<ProposalsData/>}/>
          <Route path="/proposalsForm/" element={<ProposalsForm/>}/>
          <Route path="/home" element={<Products items={items}/>}/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/product/cart" element={<ProductsInCart/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
