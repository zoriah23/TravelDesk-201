import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Hotel = ({ hotel }) => {
  const {
    hotelId,
   name, location, availableRooms, price
  } = hotel;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <Col>
      <Card
        className="w-[200px] h-[300px]"
        onClick={() =>
          navigate(
            `/hotelInfo?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&hotelId=${hotelId}`
          )
        }
      >
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <p>Location: {location}</p>
            <p>Available Rooms: {availableRooms}</p>
            <p>Price: {price}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

Hotel.propTypes = {
    hotel: PropTypes.object.isRequired,
    };

export default Hotel;