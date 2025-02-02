import React, { act, useEffect, useState } from "react";

import {
  NotificationError,
  NotificationSuccess,
} from "../../components/utlis/Notifications";
import { useLocation } from "react-router";
import { getHotels, bookHotel } from "../../utils/endpoints";
import BookHotel from "../../components/Services/Hotel/User/BookHotel";


const HotelPage = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

    const [hotels, setHotels] = useState([]);
    const [hotel, setHotel] = useState({});

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hotelId = params.get("hotelId");

    const fetchHotels = async () => {
        try {
            setLoading(true);
            const data = await getHotels();
            setHotels(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getHotel = async () => {
        try {
            const hotels = await getHotels();
            const hotel = hotels.find(hotel => hotel.hotelId === hotelId);
            setHotel(hotel);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHotel();
    }
    , [hotelId]);

//book hotel
const book = async (booking, hotelId) => {
    try {
        setLoading(true);
        bookHotel(booking, hotelId).then((resp) => {
            if (resp) {
                NotificationSuccess("Hotel booked successfully");
            } else {
                NotificationError("Hotel booking failed");
            }
            setLoading(false);
        });
    } catch (error) {
        console.log(error);
        setLoading(false);
    }

}



const triggerBook = ({userName, userPhoneNumber, date, duration, numberOfRooms, typeOfRoom}) => {
  const booking = {
    userName,
    userPhoneNumber,
    date,
    duration,
    numberOfRooms,
    typeOfRoom
  };

  book(booking, hotelId);
}


   

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!loading ? (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-4">Hotel Info</h1>
          <div className="space-y-2">
            <p className="text-gray-700">Hotel ID: {hotelId}</p>
            <h1 className="text-xl font-semibold">Hotel Name: {hotel.name}</h1>
            <h1 className="text-xl font-semibold">
              Location: {hotel.location}
            </h1>
            <div className="mt-4">
              <p>
                <strong>Availale Rooms:</strong>
                <ul className="list-disc list-inside">
                  {hotel.typeOfRoom?.map((cls, index) => {
                    const [roomType, details] = Object.entries(cls)[0];
                    return (
                      <li key={index} className="text-gray-600">
                        <strong className="text-gray-700">{roomType}:</strong>{" "}
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
                  {hotel.amenities?.map((amenity, index) => (
                    <li key={index} className="text-gray-600">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-3">
            <BookHotel book={triggerBook} />
            <button
              onClick={() =>
                navigate(
                  `/hotelCard?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&hotelCardId=${hotelCardId}`
                )
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              View Card
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      )}
    </div>
  );
};

export default HotelPage;
