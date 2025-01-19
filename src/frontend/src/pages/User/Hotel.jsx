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
  const hotelName = params.get("hotelName");

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
            const data = await getHotels();
            const hotel = data.find(hotel => hotel.name === hotelName);
            setHotel(hotel);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHotel();
    }
    , [])



    const triggerBook = async () => {
    try {
      await bookHotel(hotel.id);
      NotificationSuccess("Hotel Booked Successfully");
    } catch (error) {
      NotificationError("Failed to Book Hotel");
    }
    }

    

  return (
    <>
      {!loading ? (
        <div>
          <h1>Flight</h1>
          <h1>Name: {hotel.hotelName}</h1>
            <h1>Location: {hotel.location}</h1>
            <h1>Price: {hotel.price}</h1>
            <h1>Available Rooms: {hotel.availableRooms}</h1>
            <h1>Rating: {hotel.rating}</h1>
            <h1>Duration: {hotel.duration}</h1>
            <h1>Room Type: {hotel.roomType}</h1>
           
           
          <BookHotel book={triggerBook} />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default HotelPage;
