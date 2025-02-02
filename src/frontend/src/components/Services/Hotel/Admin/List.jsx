import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link, useLocation, useParams } from "react-router-dom";

import { getHotels, getHotelCards } from "../../../../utils/endpoints";

const GuestList = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [hotelCards, setHotelCards] = useState([]);
  const [hotel, setHotel] = useState({});
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hotelId = params.get("hotelId");

  const getHotel = async () => {
    try {
      const hotels = await getHotels();
      const hotel = hotels.find((hotel) => hotel.hotelId === hotelId);
      setHotel(hotel);
      console.log("hotel", hotel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHotel();
  }, [hotelId]);

  //fetch all hotel cards
  const fetchHotelCards = async () => {
    try {
      setLoading(true);
      getHotelCards().then((resp) => {
        if (resp) {
          setHotelCards(resp);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelCards();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-6 max-w-screen-md mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className=" text-xl  font-bold text-gray-800">Hotel Details</h1>
          </div>
          {hotel ? (
            <div className="border border-gray-300 rounded-lg p-5 bg-gray-50 shadow-md">
              <p>
                <strong>Hotel Name:</strong>
                {hotel.name}
              </p>
              <p>
                <strong>Location:</strong>
                {hotel.location}
              </p>
              <div className="mt-4">
                <p>
                  <strong>Availale Rooms:</strong>
                  <ul className="list-disc list-inside">
                    {hotel.typeOfRoom?.map((cls, index) => {
                      const [roomType, details] = Object.entries(cls)[0];
                      return (
                        <li key={index} className="text-gray-600">
                          <strong className="text-gray-700">
                            {roomType}:
                          </strong>{" "}
                          Rooms: {details.availableRooms.toString()}, Price:{" "}
                          <span className="text-green-600 font-medium">
                           ${details.price.toString()}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </p>

                <p>
                  <strong>Amenities</strong>
                  <ul className="list-disc list-inside">
                    {
                      hotel.amenities?.map((amenity, index) => (
                        <li key={index} className="text-gray-600">
                          {amenity}
                        </li>
                      ))
                    }
                  </ul>
                </p>
              </div>

            </div>
          ) : (
            <p>No hotel details available</p>
          )}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Guest List</h3>
            {loading ? (
              <Loader />
            ) : hotelCards.length ? (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-md rounded-lg bg-white">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 text-left">Card Id</th>
                      <th className="py-2 px-4 text-left">User Name</th>
                      <th className="py-2 px-4 text-left">Phone Number</th>
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Booked Rooms</th>
                      <th className="py-2 px-4 text-left">Duration</th>
                      <th className="py-2 px-4 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelCards.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-2 px-4 text-center text-gray-500"
                        >
                          Guest list is empty
                        </td>
                      </tr>
                    ) : (
                      hotelCards?.map((card, index) => (
                        <tr key={index} className="border-t border-gray-300">
                          <td className="py-2 px-4">{card.hotelCardId}</td>
                          <td className="py-2 px-4">{card.userName}</td>
                          <td className="py-2 px-4">{card.userPhoneNumber}</td>
                          <td className="py-2 px-4">{card.date}</td>
                          <td className="py-2 px-4">
                            {card.numberOfRooms.toString()}
                          </td>
                          <td className="py-2 px-4">{card.duration}</td>
                          <td className="py-2 px-4">{card.typeOfRoom}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Guest List Is Epmty.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GuestList;
