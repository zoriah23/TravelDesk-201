import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link, useLocation, useParams } from "react-router-dom";

import {   getFlights, getTicketsByFlight } from "../../../../utils/endpoints";

const FlightsList = () => {
 const location = useLocation();
  const params = new URLSearchParams(location.search);
  const flightId = params.get("flightId");

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [flight, setFlight] = useState({})

  //fetch flight
    const fetchFlights = async () => {
      try {
        const flights = await getFlights();
        const flight = flights.find((flight) => flight.flightId === flightId);
  
        setFlight(flight);
        console.log("flight", flight);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchFlights();
    }, [flightId]);

  //fetch tickets
  const fetchTickets = async (flightId) => {
    try {
      const tickets = await getTicketsByFlight(flightId);
      setTickets(tickets);
      setLoading(false);
      console.log("tickets", tickets);
    } catch (error) {
      setLoading(false);
      NotificationError("Error", "Failed to fetch tickets");
    }
  };

  useEffect(() => {
    fetchTickets(flightId);
  } , [flightId]);
 


  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Flight</h1>
          {flightId}
         
          <ul>
           
          </ul>
        </div>
      </>
    </>
  );
};

export default FlightsList;
