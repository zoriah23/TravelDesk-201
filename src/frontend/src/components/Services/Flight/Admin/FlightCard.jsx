import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Flight = ({ flight }) => {
  const {
    flightId,
    departure,
    destination,
   
    totalSeats,
    airline,
  } = flight;

  const navigate = useNavigate();

  return (
    <Col>
      <Card
        className="h-full shadow-md bg-white rounded-lg text-gray-800 px-4 py-3 transition-transform duration-200 hover:shadow-lg hover:bg-gray-100 cursor-pointer"
        onClick={() =>
          navigate(
            `/flightDetails?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&flightId=${flightId}`
          )
        }
      >
        <Card.Body>
          <Card.Title className="text-lg font-semibold">{airline}</Card.Title>
          <Card.Subtitle className="mb-2 text-gray-600 text-sm">
            {departure} → {destination}
          </Card.Subtitle>
          <Card.Text className="text-gray-500 text-sm">
            <span className="font-medium">Total Seats:</span> {totalSeats}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

Flight.propTypes = {
  flight: PropTypes.shape({
    flightId: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    flightClass: PropTypes.array.isRequired,
    totalSeats: PropTypes.string.isRequired,
    airline: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    typeOfPlane: PropTypes.string.isRequired,
    flightType: PropTypes.string.isRequired,
  }).isRequired,
};

export default Flight;
