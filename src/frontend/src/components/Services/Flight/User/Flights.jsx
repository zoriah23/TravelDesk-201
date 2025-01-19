import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import { getFlights, getFlight } from "../../../../utils/endpoints";
import Flight from "./Flight";

const Flights = () => {
  const [loading, setLoading] = useState(false);

  const [flights, setFlights] = useState([]);
  const [flight, setFlight] = useState({});
  const [show, setShow] = useState(false);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      getFlights().then((resp) => {
        if (resp) {
          setFlights(resp);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const getFlight = async () => {
    try {
      const flights = await getFlights();
      const flight = flights.find((flight) => flight.name === flightName);
      setFlight(flight);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //getFlight();
    fetchFlights();
  }, []);

  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Flights</h1>

          {/* <Link to="/adoptions?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
            {" "}
            <h1>Activities</h1>
          </Link> */}
        </div>

        <div className=" flex">
          <Row  className="">
            {loading ? (
              <Loader />
            ) : flights.length ? (
              flights.map((flight) => (
                <Flight key={flight.id} flight={flight} />
              ))
            ) : (
              <h1>No Flights</h1>
            )}
          </Row>
        </div>
      </>
    </>
  );
};

export default Flights;
