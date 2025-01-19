import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link, useParams } from "react-router-dom";

import { addHotel, getHotel, getHotels, getHotelList } from "../../../../utils/endpoints";


const HotelList = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [list, setList] = useState(false);
  const [hotel, setHotel] = useState({});

  const hotelName = useParams.get("hotelName");

  const fetchList = async () => {
    try {
      setLoading(true);
      getHotelList().then((resp) => {
        if (resp) {
          setList(resp);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchList;
  }, []);

  const getHotel = async () => {
    try {
      const hotels = await getHotels();
      const hotel = hotels.find((hotel) => hotel.name === hotelName);
      setHotel(hotel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
getHotel()
  }, [hotelName])

  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Flights</h1>
        </div>

        <div className=" flex">
          <Row xs={1} sm={2} lg={3} className="">
            {loading ? (
              <Loader />
            ) : list.length ? (
              list.map((hoetl) => (
                <div key={hotel.id} list={list}>
                  <h1>Hotel Name:{hotel.name}</h1>
                  <h1>Guests</h1>
                  <p>{hotel.guests}</p>
                </div>
              ))
            ) : (
              <h1>No Details</h1>
            )}
          </Row>
        </div>
      </>
    </>
  );
};

export default HotelList;
