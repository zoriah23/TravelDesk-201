import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import { addHotel, getHotel, getHotels  } from "../../../../utils/endpoints";
import AddHotel from "./AddHotel";
import Hotel from "./HotelCard";


const Hotels = () => {
 
  const [hotels, setHotels] = useState([]);
  const [hotel, setHotel] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const fetchHotels = async () => {
    try {
      setLoading(true);
      getHotels().then((resp) => {
        if (resp) {
          setHotels(resp);
        }
      }
      );
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  


  useEffect(() => {
    fetchHotels();
  }
  , []);

  //create hotel
  const createHotel = async (hotel) => {
    try {
     setLoading(true);
      addHotel(hotel).then((resp) => {
        if (resp) {
          NotificationSuccess("Hotel added successfully");
          fetchHotels();
        } else {
          NotificationError("Failed to add hotel");
        }
      });
      setLoading(false);
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  
    
 

  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Hotels</h1>
          <AddHotel save={createHotel} />

          {/* <Link to="/adoptions?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
            {" "}
            <h1>Adoptions</h1>
          </Link> */}
        </div>

        <div className=" flex">
          <Row xs={1} sm={2} lg={3} className="">
          {hotels.map((_hotelInfo, index) => (
                 <Hotel
                   key={index}
                   hotel={{
                     ..._hotelInfo,
                   }}
                 />
               ))}
         
          </Row>
        </div>
      </>
    </>
  );
};

export default Hotels;
