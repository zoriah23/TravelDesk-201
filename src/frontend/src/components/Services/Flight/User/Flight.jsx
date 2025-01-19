import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Flight = ({ flight }) => {
  const {
    flightId,
    departure,
    destination,
    price,
    airline,
    departureTime,
    arrivalTime,
   
  } = flight;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <Col>
      <Card
        className="w-[250px] h-[200px]"
        onClick={() =>
          navigate(
            `/flightInfo?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&flightId=${flightId}`
          )
        }
      >
        <Card.Body>
          <Card.Text>
            <p>
              <strong>Airline:</strong> {airline}
            </p>
            <p>
              <strong>Departure:</strong> {departure}
            </p>
            <p>
              <strong>Destination:</strong> {destination}
            </p>

            <p>
              <strong>Departure Time:</strong> {departureTime}
            </p>
            <p>
              <strong>Arrival Time:</strong> {arrivalTime}
            </p>
            <p>
              <strong>Price:</strong> ${price}
            </p>
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
