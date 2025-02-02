import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Flight = ({ flight }) => {
  const {
    flightId,
    departure,
    destination,
    airline,
    departureTime,
    arrivalTime,
   
  } = flight;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <Col className="p-4">
      <Card
        className="w-64 h-56 shadow-lg rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
        onClick={() =>
          navigate(
            `/flightInfo?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&flightId=${flightId}`
          )
        }
      >
        <Card.Body className="text-center">
          <Card.Title className="text-lg font-bold text-gray-800">
            {departure} ➝ {destination}
          </Card.Title>
          <Card.Text className="text-gray-600 space-y-2">
            <p className="font-medium">Airline: {airline}</p>
            <p className="text-sm">Departure: {departureTime}</p>
            <p className="text-sm">Arrival: {arrivalTime}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

Flight.propTypes = {
  flight: PropTypes.object.isRequired,
};

export default Flight;
