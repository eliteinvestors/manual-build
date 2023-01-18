/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { auth, db } from "./Firebase";
import "./Navbar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import Modalbox from "./Modalbox";

/*

Login UID Details
jerry@bidecapital.com - VNVBvBB47FVm5icsrR3hTRowmTX2 - 4
jerryskefos@gmail.com - FLALmIEpkzYJWSN748BDiAvaC5m1 - 1
mickjohnson@gmail.com - l5BD11yERHfkPBxplII3WzCJKR32 - 2
johnjones@gmail.com - 8rAdS49UqRfgg9mAaCsDOltJ1nH2 - 3

*/

function Home() {
  const navigate = useNavigate();

  const propertiesCollectionRef = collection(db, "properties");
  const activityColectionRef = collection(db, "activity_log");
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [modalId, setModalId] = useState("");
  const user_token = localStorage.getItem("Auth Token");

  const updateStatus = async (id, status, btn) => {
    if (status == "Accepting Offers") {
      const newStatus = properties.map((obj) => {
        if (obj.id == id) {
          return { ...obj, status: "Reserved" };
        } else {
          return { ...obj };
        }
      });
      setProperties(newStatus);
      const newProperties = doc(db, "properties", id);
      updateDoc(newProperties, {
        status: "Reserved",
        click: btn,
        date_time: Date(),
      }).catch((error) => {
        console.log(error.message);
      });
    }
    //await updateDoc(properties )
  };

  const updateBtn = async (id, btn) => {
    const newProperties = doc(db, "properties", id);
    updateDoc(newProperties, {
      click: btn,
      date_time: Date(),
    }).catch((error) => {
      console.log(error.message);
    });
    setModalId(id);
    console.log(modalId);
  };

  const updateUserOnButton= async(property,status,latest_id,user_id,btn)=>{
    console.log(property,status,latest_id,user_id)
    const newActivity=collection(db,"activity_log")
    const propertyRef=doc(db,'properties',property['id'])
    if(status['activity']=='Submit Offer' && btn=="Submit Offer"){
      // Dont update the property just add to activity logs
      status['activity']="Submit Offer"
      status['datetime']=Date()
      status['decline_reason']=""
      addDoc(newActivity,{
        'activity':status['activity'],
        'datetime':status['datetime'],
        'decline_reason':status['decline_reason'],
        'property':property['property_id'],
        'user_id':user_id
      }).then(response=>{
        console.log("Updated")
        updateProperties()
      })
      alert("Your request has been submitted we will get back to you soon!")
    }
    else if(status['activity']=='Seeking Partner' && btn=="Submit Offer"){
      // add to activity log
      status['activity']="Submit Offer"
      status['datetime']=Date()
      status['decline_reason']=""
      // update the property
      property['status']="Reserved"
      property['user']={
        [user_id]:status
      }
      addDoc(newActivity,{
        'activity':status['activity'],
        'datetime':status['datetime'],
        'decline_reason':status['decline_reason'],
        'property':property['property_id'],
        'user_id':user_id
      }).then(response=>{
        console.log("Updated")
        updateDoc(propertyRef,property)
        updateProperties()
      })
      
    }
    else if(status['activity']=='Seeking Partner' && btn=="Seek Partner"){
      // add to activity log
      const prevSatus=status
      status['activity']="Seek Partner"
      status['datetime']=Date()
      status['decline_reason']=""
      // update the property
      property['status']="Reserved"
      property['user']={
        [user_id]:status,
        [latest_id]:prevSatus
      }
      addDoc(newActivity,{
        'activity':status['activity'],
        'datetime':status['datetime'],
        'decline_reason':status['decline_reason'],
        'property':property['property_id'],
        'user_id':user_id
      }).then(response=>{
        console.log("Updated")
        updateDoc(propertyRef,property)
        updateProperties()

      })

    }
    else if(status['activity']=='Accepting Offers' && btn=="Submit Offer"){
      // add to activity log
      const prevSatus=status
      status['activity']="Submit Offer"
      status['datetime']=Date()
      status['decline_reason']=""
      
      // update the property
      property['status']="Reserved"
      property['user']={
        [user_id]:status
      }
      addDoc(newActivity,{
        'activity':status['activity'],
        'datetime':status['datetime'],
        'decline_reason':status['decline_reason'],
        'property':property['property_id'],
        'user_id':user_id
      }).then(response=>{
        console.log("Updated")
        updateDoc(propertyRef,property)
        updateProperties()

      })
    }
    else if(status['activity']=='' && btn=="Submit Offer"){
      // add to activity log
      const prevSatus=status
      status['activity']="Submit Offer"
      status['datetime']=Date()
      status['decline_reason']=""
      
      // update the property
      property['status']="Reserved"
      property['user']={
        [user_id]:status
      }
      addDoc(newActivity,{
        'activity':status['activity'],
        'datetime':status['datetime'],
        'decline_reason':status['decline_reason'],
        'property':property['property_id'],
        'user_id':user_id
      }).then(response=>{
        console.log("Updated")
        console.log(property)
        updateDoc(propertyRef,property)
        updateProperties()

      })
    }
    else if(status['activity']=='Accepting Offers' && btn=="Seek Partner"){
      // add to activity log
      const prevSatus=status
      status['activity']="Seeking Partner"
      status['datetime']=Date()
      status['decline_reason']=""
      addDoc(newActivity,{
        'activity':status['activity'],
        'datetime':status['datetime'],
        'decline_reason':status['decline_reason'],
        'property':property['property_id'],
        'user_id':user_id
      }).then(response=>{
        console.log("Updated")
        updateProperties()
      })
      // update the property
      property['status']="Seeking Partner"
      property['user']={
        [user_id]:status
      }
      updateDoc(propertyRef,property)
    }
    else if(status['activity']=='' && btn=="Seek Partner"){
      // add to activity log
      const prevSatus=status
      status['activity']="Seeking Partner"
      status['datetime']=Date()
      status['decline_reason']=""
      addDoc(newActivity,{
        'activity':status['activity'],
        'datetime':status['datetime'],
        'decline_reason':status['decline_reason'],
        'property':property['property_id'],
        'user_id':user_id
      }).then(response=>{
        console.log("Updated")
        updateProperties()
      })
      // update the property
      property['status']="Seeking Partner"
      property['user']={
        [user_id]:status
      }
      updateDoc(propertyRef,property)
    }
    

  }


  const updateProperties=async()=>{
    const data = await getDocs(propertiesCollectionRef);
    console.log(Object.keys(data.docs));
    var tempProperties = [];
    await data.docs.forEach((doc) => {
      tempProperties = [...tempProperties, doc.data()];
    });
    console.log(tempProperties)
    setProperties(tempProperties);
    getProperties();

  }

  const setDeclineReason=async(properties,reason)=>{
    console.log(properties,reason)
    const newActivity=collection(db,"activity_log")
    const propertyRef=doc(db,'properties',properties['id'])
    // const decline={
    //   [user_token]={

    //   }
    // }
    const declined={
      date_time:Date(),
      reason:reason
    }
    if((Object.keys(properties['declined_users'])).includes(user_token)){
      properties['declined_users'][user_token]=declined
      addDoc(newActivity,{
        'activity':"Declined",
        'datetime':Date(),
        'decline_reason':reason,
        'property':properties['property_id'],
        'user_id':user_token
      }).then(response=>{
        console.log("Updated")
        updateProperties()
      })
      updateDoc(propertyRef,properties)
    }else{
      properties['declined_users']={
        [user_token]:declined
      }
      addDoc(newActivity,{
        'activity':"Declined",
        'datetime':Date(),
        'decline_reason':reason,
        'property':properties['property_id'],
        'user_id':user_token
      }).then(response=>{
        console.log("Updated")
        updateProperties()
      })
      updateDoc(propertyRef,properties)
    }
    setModalId("")
  }


  const getProperties = async () => {
    const data = await getDocs(propertiesCollectionRef);
    console.log(!Object.keys(data.docs[0].data()["declined_users"]).includes(user_token));

    var tempProperties = [];
    await data.docs.forEach((doc) => {
      if(!Object.keys(doc.data()["declined_users"]).includes(user_token)){
        console.log(doc.data())
        tempProperties = [...tempProperties, doc.data()];
      }
    });
    setProperties(tempProperties);

    console.log(properties);
    setIsReady(true);
  };

  useEffect(() => {
    setIsReady(false);
    console.log(modalId);
    const user_token = localStorage.getItem("Auth Token");
    console.log(user_token);
    if (user_token) {
      
      getProperties();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div class="container1">
        <h1>Current Opportunities</h1>
      </div>
      {isReady ? (
        <div className="dashboard-box">
          {properties.map((properties) => {
            return (
              <div className="outer-box">
                {Object.keys(properties.user)[0].length == 0 ? (
                  <div className="img-box-accepting">
                    <p>Accepting Offers</p>
                    <img
                      src={properties.photo_front}
                      alt="photo"
                      className="prop-img"
                    />
                  </div>
                ) : null}
                {properties['status'] ==
                "Accepting Offers" ? (
                  <div className="img-box-accepting">
                    <p>Accepting Offers</p>
                    <img
                      src={properties.photo_front}
                      alt="photo"
                      className="prop-img"
                    />
                  </div>
                ) : null}

                {properties['status'] ==
                "Seeking Partner" ? (
                  <div className="img-box-seeking">
                    <p>Seeking Partner</p>
                    <img
                      src={properties.photo_front}
                      alt="photo"
                      className="prop-img"
                    />
                  </div>
                ) : null}

                {properties['status'] ==
                "Reserved" ? (
                  <div className="img-box-reserved">
                    <p>Reserved</p>
                    <img
                      src={properties.photo_front}
                      alt="photo"
                      className="prop-img"
                    />
                  </div>
                ) : null}

                {properties['status'] ==
                "Pending" ? (
                  <div className="img-box-pending">
                    <p>Pending</p>

                    <img
                      src={properties.photo_front}
                      alt="photo"
                      className="prop-img"
                    />
                  </div>
                ) : null}

                {properties['status'] ==
                "Sold" ? (
                  <div className="img-box-sold">
                    <p>Sold</p>

                    <img
                      src={properties.photo_front}
                      alt="photo"
                      className="prop-img"
                    />
                  </div>
                ) : null}
                <div className="text-box">
                  <div className="text">   
                  <h6 className="height">   
                    <h5>Address :&nbsp;<b> {properties.address} , {properties.zip}{" "}</b></h5>
                    <br></br>
                    <h5>Bed :&nbsp; <b>{properties.beds}</b></h5> <h5> Baths :&nbsp; {" "}
                    <b>{properties.baths}</b></h5> <h5> Size :&nbsp;<b>{properties.size}</b></h5>
                    <br></br>
                    <h5>Asking Price :&nbsp; <b>{properties.asking_price}</b></h5>
                    <br></br>
                    <h5>ARV :&nbsp; <b>{properties.arv}</b>{""}</h5>
                    <br></br>
                    <h5>Current Rent :&nbsp;<b>{properties.current_rent}</b> </h5> <br></br>
                    <h5>Prospective Rent :&nbsp; <b>{properties.prospective_rent}</b></h5>
                    <br></br>
                    <h5>Estimated Repairs :&nbsp; <b>{properties.estimated_repairs}</b></h5>
                  
                  </h6></div>
                </div>
                <div>
                  <ul className="button-box">
                    <li>
                      <a
                        onClick={() => {
                          updateBtn(properties.id, "comps analysis");
                        }}
                        href={properties.comps_url}
                        target="_blank"
                        download
                      >
                        <button
                          onClick={() => {
                            updateBtn(properties.id, "comps analysis");
                          }}
                        >
                          Comps Analysis
                        </button>
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          updateUserOnButton(properties,properties.user[Object.keys(properties.user)[0]],Object.keys(properties.user),user_token,"Submit Offer")
                        }}
                      >
                        Submit Offer
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          updateUserOnButton(properties,properties.user[Object.keys(properties.user)[0]],Object.keys(properties.user),user_token,"Seek Partner")
                        }}
                      >Seeking Partner</button>
                    </li>
                    <li>
                      <div >
                        <button
                          onClick={() => {
                            updateBtn(properties.id, "decline");
                            setIsOpen(true);
                          }}
                        >
                          Decline
                          
                          </button>
                          <Modalbox  open={modalId==properties.id} onClose={() => setModalId("")}>
                          <div className="overlay-styles">
                          <div className="modal-styles">
                            <h6 id="decline-text">
                              Please Select the reason(s) you are declining.</h6>
                              <ul className="decline-box">
                              <button onClick={()=>{
                                setDeclineReason(properties,"Property is overvalued")
                              }} className="reason">Property is overvalued</button>
                              <button onClick={()=>{
                                setDeclineReason(properties,"Over my current budget")
                              }} className="reason">Over my current budget</button>
                              <button onClick={()=>{
                                setDeclineReason(properties,"Location")
                              }} className="reason">Location</button>
                              <button onClick={()=>{
                                setDeclineReason(properties,"Too much to renovate")
                              }} className="reason">Too much to renovate</button>
                              <button onClick={()=>{
                                setDeclineReason(properties,"Other")
                              }} className="reason">Other</button>
                              </ul>

                            
                        </div>
                        </div>
                          </Modalbox> 
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default Home;

