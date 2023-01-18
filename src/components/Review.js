import React, { useState, useEffect } from "react";
import { auth, db } from "./Firebase";
import "./Navbar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
// import "./Review.css";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Modalbox from "./Modalbox";

function Home() {
  const navigate = useNavigate();

  const propertiesCollectionRef = collection(db, "properties");
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState([]);

  const updateStatus = async (id, status) => {
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
      }).catch((error) => {
        console.log(error.message);
      });
    }
    //await updateDoc(properties )
  };

  useEffect(() => {
    const getProperties = async () => {
      const data = await getDocs(propertiesCollectionRef);
      console.log(data);

      setProperties(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setStatus(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.warn(properties);
    };
    getProperties();
  }, []);

  return (
    <>
      <Navbar />
      <div class="container1">
        <h1>Review Responses</h1>
      </div>
      <div className="container2">
        {/*<div>
            <button>test</button>
            <Modalbox>
                Fancy Modal
            </Modalbox>
            
    </div>*/}

        {properties.map((properties) => {
          return properties.click != "" ? (
            <div className="outer-box">
              {properties.status == "Accepting Offers" ? (
                <div className="img-box-accepting">
                  <p>{properties.status}</p>
                  <img src={properties.photo_front} alt="photo" className="prop-img"/>
                </div>
              ) : null}

              {properties.status == "Seeking Partner" ? (
                <div className="img-box-seeking">
                <p>{properties.status}</p>
                <img src={properties.photo_front} alt="photo" className="prop-img"/>
                </div>
              ) : null}

              {properties.status == "Reserved" ? (
                <div className="img-box-reserved">
                                    <p>{properties.status}</p>
                  <img src={properties.photo_front} alt="photo" className="prop-img" />
                </div>
              ) : null}

              {properties.status == "Pending" ? (
                <div className="img-box-pending">
                                    <p>{properties.status}</p>

                  <img src={properties.photo_front} alt="photo" className="prop-img"/>
                </div>
              ) : null}

              {properties.status == "Sold" ? (
                <div className="img-box-sold">
                                    <p>{properties.status}</p>

                  <img src={properties.photo_front} alt="photo" className="prop-img" />
                </div>
              ) : null}
              <div className="text-box">
                <h5>
                  <b>Address:</b> {properties.address} , {properties.zip}{" "}
                  <br></br>
                  <br></br>
                  <b>Bed :</b> {properties.beds} <b> Baths : </b>{" "}
                  {properties.baths} <b> Size :</b> {properties.size}
                  <br></br>
                  <b>Asking Price :</b> {properties.asking_price}
                  <br></br>
                  <b>ARV : </b> {properties.arv}
                  <br></br>
                  <b>Current Rent : </b>
                  {properties.current_rent} <br></br>
                  <b>Prospective Rent : </b> {properties.prospective_rent}
                  <br></br>
                  <b>Estimated Repairs : </b> {properties.estimated_repairs}
                </h5>
              </div>
              <div>
                <ul className="button-box">
                  {properties.click != "comps analysis" ? (
                    <li>
                      <a href={properties.comps_url} target="_blank" download>
                        <button>Comps Analysis</button>
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a href={properties.comps_url} target="_blank" download>
                        <button class="clicked">Comps Analysis</button>
                      </a>
                    </li>
                  )}
                  {properties.click != "submit offer" ? (
                    <li>
                      <button
                        onClick={() => {
                          updateStatus(properties.id, properties.status);
                        }}
                      >
                        Submit Offer
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button
                        class="clicked"
                        onClick={() => {
                          updateStatus(properties.id, properties.status);
                        }}
                      >
                        Submit Offer
                      </button>
                    </li>
                  )}
                  {properties.click != "seeking partner" ? (
                    <li>
                      <button>Seeking Partner</button>
                    </li>
                  ) : (
                    <li>
                      <button class="clicked">Seeking Partner</button>
                    </li>
                  )}
                  {properties.click != "decline" ? (
                    <li>
                      <button>Decline</button>
                    </li>
                  ) : (
                    <li>
                      <button class="clicked">Decline</button>
                    </li>
                  )}
                             
                </ul>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
}
export default Home;
