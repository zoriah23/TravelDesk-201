import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import { getHotels, getHotel } from "../../../../utils/endpoints";
import Hotel from "./Hotel";
import NavBar from "../../../User/NavBar";

const Hotels = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [hotels, setHotels] = useState([]);
  const [hotel, setHotel] = useState({});
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

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

  const getHotel = async () => {
    try {
      const data = await getHotels();
      const hotel = data.find((hotel) => hotel.id === hotelId);
      setHotel(hotel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (location.trim() === "") {
      setResults(hotels);
    } else {
      const filteredHotels = hotels.filter((hotel) =>
        hotel.location.toLowerCase().includes(location.toLowerCase())
      );
      setResults(filteredHotels);
    }
  }, [location, hotels]);

  const handleSearch = (e) => {
    setLocation(e.target.value);
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-blue-800">Hotels</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center">
                <Loader />
              </div>
            ) : hotels.length ? (
              hotels.map((hotel) => <Hotel key={hotel.id} hotel={hotel} />)
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No hotels available
              </p>
            )}
          </div>
        </div>
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-blue-800">
              Search For Hotels
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
          {loading ? (
            <p className="text-center text-gray-600">Loading results...</p>
          ) : hasSearched ? (
            results.length > 0 ? (
              <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                  <h1 className="text-3xl font-bold text-blue-800">
                    Search Results
                  </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((hotel) => (
                    <Hotel key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No hotels available.
              </p>
            )
          ) : null}{" "}
        </div>
      </div>
    </>
  );
};

export default Hotels;
