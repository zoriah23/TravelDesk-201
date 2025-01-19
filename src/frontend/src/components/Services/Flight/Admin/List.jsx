import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link, useParams } from "react-router-dom";

import {  getTickets } from "../../../../utils/endpoints";

const FlightsList = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [tickets, setTickets] = useState([]);

  //fetch tickets

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const tickets = await getTickets();
      setTickets(tickets);
      setLoading(false);
      console.log("tickets", tickets);
    } catch (error) {
      setLoading(false);
      NotificationError("Error", "Failed to fetch tickets");
    }
  }
  , []);

  useEffect(() => {
    fetchTickets();
  }
  , [fetchTickets]);


  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Flight</h1>
         
          <ul>
           
          </ul>
        </div>
      </>
    </>
  );
};

export default FlightsList;
