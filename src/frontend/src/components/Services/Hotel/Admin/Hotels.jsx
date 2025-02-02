import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import { addHotel, getHotel, getHotels } from "../../../../utils/endpoints";
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
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

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
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <div className="relative w-full p-4 bg-white shadow-md rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-gray-800">Hotels</h1>
              <div>
                <AddHotel save={createHotel} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center items-center h-20">
                  <Loader />
                </div>
              ) : (
                hotels.map((hotel) => <Hotel key={hotel.id} hotel={hotel} />)
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Hotels;
