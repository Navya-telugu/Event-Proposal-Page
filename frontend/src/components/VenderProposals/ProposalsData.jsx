import React, { useState, useEffect } from "react";
import "./ProposalsData.css";
import Edit from "../images/pencil-edit-button.png";
import Delete from "../images/bin.png";
import Search from "../images/search.png";
import { FaFilter } from "react-icons/fa";
import Header from "../headers/header";
import { useNavigate,Link} from "react-router-dom";
import axios from "axios";
function ProposalsData() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 
  const token = `Bearer ${localStorage.getItem("token")}`;
  
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      alert("Please login first");
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch("https://event-proposal-page-dp1n.onrender.com/proposalsData", {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "authorization": token
            }
          });
          const data = await response.json();
          setProposals(data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [token,navigate]);
  // delete handling
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this proposal?");
    if (confirmed) {
      await axios.delete(`https://event-proposal-page-dp1n.onrender.com/proposalDelete/${id}`);
      setProposals(proposals.filter((eachData) => eachData._id !== id));
    }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (event) => setSearchTerm(event.target.value);
  
  function handleNav(){
    navigate(`/proposalsForm`)
  }
  const results = !searchTerm
    ? proposals
    : proposals.filter((each) =>
        each.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="total-container">
      <section className="imported-header">
        <Header/>
      </section>
      <section className="total-proposals-container">
        <section className="header-search-box">
          <section className="proposals-search-container">
            <h1 style={{color:"#081838",fontSize:"24px"}}>Proposals</h1>
            <section>
              <label htmlFor="search">
                <img src={Search} alt="search" height={"15px"} />
              </label>
              <input
                type="text"
                id="search"
                style={{
                  width: "200px",
                  height: "30px",
                  borderRadius: "5px",
                  border: "0px solid",
                  color:"black"
                }}
                placeholder="Search projects"
                onChange={handleSearch}
              />
            </section>
          </section>
          <section className="filter-create-container">
            <span>
              <FaFilter size={25}/>
            </span>
              <button className="create-button" onClick={handleNav}>CREATE </button>
          </section>
        </section>
        {results.map((item) => (
          <div
            key={item._id}
            className="container"
            style={{ marginBottom: "15px" }}
          >
            <section className="eventName-heading">
              Event Name<p>{item.eventName}</p>
            </section>
            <section className="events-container" style={{ display: "flex" }}>
              <section className="container-row" style={{ display: "flex" }}>
                <div>
                  Event Type<p>{item.eventType}</p>
                </div>
                <div>
                  Proposal Type<p>{item.proposalType}</p>
                </div>
                <div>
                  From Date<p>{item.fromDate}</p>
                </div>
                <div>
                  To Date<p>{item.toDate}</p>
                </div>
                <div>
                  Budget<p>{item.budget}</p>
                  {console.log(item)}
                </div>
              </section>
              <section className="edit-delete-container">
                <Link to={`/updateproposal/${item._id}`}>
                <button>
                  <img src={Edit} alt="edit" />
                </button>
                </Link>
                <button
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  <img src={Delete} alt="delete" />
                </button>
              </section>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProposalsData;


//http://localhost:8080/proposalsData
//http://localhost:8080/proposalDelete
