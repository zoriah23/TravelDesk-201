import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Flight = ({ flight }) => {
  const {
    flightId,
    departure,
    destination,
    basePrice,
    flightClass,
    totalSeats,
    airline,
    departureTime,
    arrivalTime,
    typeOfPlane,
    flightType,
  } = flight;

  const navigate = useNavigate();

  return (
    <Col>
      <Card
        className="w-[300px] h-[400px]"
        onClick={() =>
          navigate(
            `/flightDetails?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&flightId=${flightId}`
          )
        }
      >
        <Card.Body>
          <Card.Text>
            <p>
              <strong>Flight ID:</strong> {flightId}
            </p>
            <p>
              <strong>Departure:</strong> {departure}
            </p>
            <p>
              <strong>Destination:</strong> {destination}
            </p>
            <p>
              <strong>Airline:</strong> {airline}
            </p>
            <p>
              <strong>Departure Time:</strong> {departureTime}
            </p>
            <p>
              <strong>Arrival Time:</strong> {arrivalTime}
            </p>
            <p>
              <strong>Price:</strong> ${basePrice}
            </p>
            <p>
              <strong>Total Seats:</strong> {totalSeats}
            </p>
            <p>
              <strong>Type of Plane:</strong> {typeOfPlane}
            </p>
            <p>
              <strong>Flight Type:</strong> {flightType}
            </p>

            {/* Render Flight Classes */}
            <strong>Flight Classes:</strong>
            <ul>
              {flightClass.map((cls, index) => {
                const [className, details] = Object.entries(cls)[0];
                return (
                  <li key={index}>
                    <strong>{className}:</strong> Seats:{" "}
                    {details.availableSeats}, Price: ${details.price}
                  </li>
                );
              })}
            </ul>
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
