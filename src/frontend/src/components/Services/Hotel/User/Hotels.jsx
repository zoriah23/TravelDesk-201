import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import { getHotels, getHotel } from "../../../../utils/endpoints";
import Hotel from "./Hotel";

const Hotels = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

    const [hotels, setHotels] = useState([]);
    const [hotel, setHotel] = useState({});

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


    const getHotel = async () => {
        try {
            const data = await getHotels();
            const hotel = data.find(hotel => hotel.id === hotelId);
            setHotel(hotel);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
     fetchHotels();
    },
    [])

  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Hotelss</h1>

          {/* <Link to="/adoptions?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
            {" "}
            <h1>Activities</h1>
          </Link> */}
        </div>

        <div className=" flex">
          <Row xs={1} sm={2} lg={3} className="">
            {loading ? (
              <Loader />
            ) : hotels.length ? (
              hotels.map((hotel) => (
                <Hotel key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <h1>No hotels available</h1>
            )}
          </Row>
        </div>
      </>
    </>
  );
};

export default Hotels;
