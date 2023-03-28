import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import "./ProposalsForm.css";

const UpdateProposal = () => {
  const { id } = useParams()

const navigate = useNavigate()
  const [eventName, setEventName] = useState("");
  const [placeOfEvent, setPlaceOfEvent] = useState("");
  const [proposalType, setProposalType] = useState("");
  const [eventType, setEventType] = useState("");
  const [budget, setBudget] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState("");
  const [events, setEvents] = useState("");
  const [error, setError] = useState("");
  const [previewImages, setPreviewImages] = useState([]);


  useEffect(()=>{
    axios.get(`http://localhost:8080/update/${id}`).then(res=>{

    //  console.log("I am Here")  

    console.log(res.data.newdata)
    const data = res.data.newdata
    setEventName(data.eventName);
    setPlaceOfEvent(data.placeOfEvent);
    setProposalType(data.proposalType);
    setEventType(data.eventType);
    setBudget(data.budget);
    setFromDate(data.fromDate);
    setToDate(data.toDate);
    setDescription(data.description);
    setFoodPreferences(data.foodPreferences);
    setEvents(data.events);

   setPreviewImages(previewImages);

  })
    
  },[id, previewImages])

    // .then(res => res.json())
    //       .then(data => {
    //         console.log(data.data);
    //         // setData(data.data);
    //         setEventName(data.data.eventName)
    //         // setPlace(data.data.place)
    //         setProposalType(data.data.proposalType);
    //         setEventType(data.data.eventType);
    //         // setDateFrom(data.data.date_from);
    //         setBudget(data.data.budget)
    //         // setDateTo(data.data.date_to);
    //         setDescription(data.data.description);
    //         // setFood(data.data.food);
    //         setEvents(data.data.events);


  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };
  const handlePlaceOfEventChange = (e) => {
    setPlaceOfEvent(e.target.value);
  };
  const handleProposalTypeChange = (e) => {
    setProposalType(e.target.value);
  };
  const handleEvneTypeChange = (e) => {
    setEventType(e.target.value);
  };
  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };
  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = [...postImage, ...e.target.files];
    setPostImage(files);
    const images = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(images);
  };
  const handleFoodPreferencesChange = (e) => {
    setFoodPreferences(e.target.value);
  };
  const handleEventsChange = (e) => {
    setEvents(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !eventName ||
      !placeOfEvent ||
      !proposalType ||
      !eventType ||
      !budget ||
      !fromDate ||
      !toDate ||
      !description ||
      !foodPreferences ||
      !events ||
      !postImage
    ) {
      setError("Please Fill All The Details");
    }
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("placeOfEvent", placeOfEvent);
    formData.append("proposalType", proposalType);
    formData.append("eventType", eventType);
    formData.append("budget", budget);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    formData.append("description", description);
    formData.append("foodPreferences", foodPreferences);
    formData.append("events", events);
    for (let i = 0; i < postImage.length; i++) {
      formData.append("images", postImage[i]);
    }
    const objsubmit = {
      eventName :eventName,
      placeOfEvent:placeOfEvent,
      proposalType :proposalType,
      eventType:eventType,
      budget:budget,
      fromDate:fromDate,
      toDate:toDate,
      description:description,
      foodPreferences:foodPreferences,
      events:events,
      postImage:postImage,

    }
axios.put(`http://localhost:8080/update/${id}`,objsubmit)
.then(response=>console.log(response))
.then(()=>navigate("/proposalsData/"))
.catch(error=>console.log(error))
  };
  return (
    <section className="container">
      <section className="header-container">
      </section>
      <section className="body-container">
        <section className="main-container">
          <section className="header">
            <h1 className="form-heading-text">CreateProposal</h1>
          </section>
          <form className="form-container">
            <span
              style={{ color: "red", marginLeft: "5em", fontWeight: "bold" }}
            >
              {error}
            </span>
            <section className="form-inside-boxes">
              <section className="leftSide-container">
                <section className="eventName-text">
                  <label htmlFor="eventName">EventName</label>
                </section>
                <input
                  type="text"
                  id="eventName"
                  onChange={handleEventNameChange}
                  name="eventName"
                  value={eventName}
                  placeholder="Name"
                  required
                />
                <section
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="side-by-side-inputs"
                >
                  <section>
                    <section className="label-text">
                      <label htmlFor="placeOfEvent">Place Of Event</label>
                    </section>
                    <select
                      id="placeOfEvent"
                      onChange={handlePlaceOfEventChange}
                      name="placeOfEvent"
                      value={placeOfEvent}
                      required
                    >
                      <option>Select</option>
                      <option value="bengalore">Bengalore</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="chenni">Chennai</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="mumbai">Kolkata</option>
                    </select>
                  </section>
                  <section>
                    <section className="label-text">
                      <label htmlFor="proposalType">Proposals Type</label>
                    </section>
                    <select
                      id="proposalType"
                      onChange={handleProposalTypeChange}
                      name="proposalType"
                      value={proposalType}
                      required
                    >
                      <option>Select</option>
                      <option value="venue">Venue</option>
                      <option value="birthday">Birthday</option>
                      <option value="catering">Catering</option>
                      <option value="awareness">Awareness</option>
                    </select>
                  </section>
                </section>
                <section
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="side-by-side-inputs"
                >
                  <section>
                    <section className="label-text">
                      <label htmlFor="eventType">Event Type</label>
                    </section>
                    <select
                      id="eventType"
                      onChange={handleEvneTypeChange}
                      name="eventType"
                      value={eventType}
                      required
                    >
                      <option>Select</option>
                      <option value="marriage">Marriage</option>
                      <option value="birthday">BirthDay</option>
                      <option value="preWedding">PreWedding</option>
                      <option value="otherEvent">OtherEvent</option>
                    </select>
                  </section>
                  <section>
                    <section className="label-text">
                      <label htmlFor="budget">Budget</label>
                    </section>
                    <input
                      type="number"
                      id="budget"
                      onChange={handleBudgetChange}
                      name="budget"
                      value={budget}
                      placeholder="000000"
                      required
                    />
                  </section>
                </section>
                <section
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="side-by-side-inputs"
                >
                  <section>
                    <section className="label-text">
                      <label htmlFor="fromDate">From</label>
                    </section>
                    <input
                      type="date"
                      id="fromDate"
                      onChange={handleFromDateChange}
                      name="fromDate"
                      value={fromDate}
                      required
                    />
                  </section>
                  <section>
                    <section className="label-text">
                      <label htmlFor="toDate">To</label>
                    </section>
                    <input
                      type="date"
                      id="toDate"
                      onChange={handleToDateChange}
                      name="toDate"
                      value={toDate}
                      required
                    />
                  </section>
                </section>
                <section>
                  <section className="label-text">
                    <label htmlFor="description">Description</label>
                  </section>
                  <textarea
                    type="textarea"
                    id="description"
                    onChange={handleDescriptionChange}
                    name="description"
                    value={description}
                    placeholder="Description"
                    required
                  />
                </section>
              </section>
              <section className="rightSide-container">
                <section className="file-container">
                  <label htmlFor="postImage">Images</label>
                  <input
                    className="file-input-container"
                    type="file"
                    name="postImage"
                    id="postImage"
                    multiple
                    onChange={handleImageChange}
                    required
                  />
                </section>
                <div className="preview-images-container">
                  {previewImages.map((images, index) => (
                    <img
                      key={index}
                      src={images}
                      alt="previewImages"
                      width="50"
                      height="50"
                    />
                  ))}
                </div>
                <section>
                  <section className="label-text">
                    <label htmlFor="foodPreferences">FoodPreferences</label>
                  </section>
                  <textarea
                    type="textarea"
                    id="foodPreferences"
                    onChange={handleFoodPreferencesChange}
                    name="foodPreferences"
                    value={foodPreferences}
                    placeholder="Preferences"
                    required
                  />
                </section>
                <section></section>
                <section className="label-text">
                  <label htmlFor="events">Events</label>
                </section>
                <textarea
                  type="textarea"
                  id="events"
                  onChange={handleEventsChange}
                  name="events"
                  value={events}
                  placeholder="Events"
                  required
                />
              </section>
            </section>
            <section className="button-container">
              <button type="submit" onClick={handleSubmit}>UpDate
              </button>
            </section>
          </form>
        </section>
      </section>
    </section>
  );
};
export default UpdateProposal;

// "- Create ""Create proposals"" page react components
// - Populate existing proposals from backend(page 6)"