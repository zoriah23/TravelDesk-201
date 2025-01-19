import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Hotel = ({ hotel }) => {
  const { hotelId, name, location, typeOfRoom, price, numberofRooms, rating, description, amenities, availableRooms } = hotel;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <Col>
      <Card
        className="w-[200px] h-[300px] m-4"
        onClick={() =>
          navigate(`/hotelDetails?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai&hotelName=${hotelName}`)
        }
      >
        <Card.Body>
          <Card.Title>Name: {name}</Card.Title>
          <Card.Text>Location: {location}</Card.Text>
          <Card.Text>Type of Room: {typeOfRoom}</Card.Text>
          <Card.Text>Price: {price}</Card.Text>
          <Card.Text>Number of Rooms: {numberofRooms}</Card.Text>
          <Card.Text>Rating: {rating}</Card.Text>
          <Card.Text>Description: {description}</Card.Text>
          <Card.Text>Amenities: {amenities}</Card.Text>
          <Card.Text>Available Rooms: {availableRooms}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

Hotel.propTypes = {
    hotel: PropTypes.object.isRequired,
    };


export default Hotel;
