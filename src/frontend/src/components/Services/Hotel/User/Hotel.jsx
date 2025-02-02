import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Hotel = ({ hotel }) => {
  const { hotelId, name, location, price } = hotel;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <Col className="p-4">
          <Card
            className="w-64 h-56 shadow-lg rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() =>
              navigate(
                `/hotelInfo?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&hotelId=${hotelId}`
              )
            }
          >
            <Card.Body className="text-center">
              <Card.Title className="text-lg font-bold text-gray-800">
               {name}
              </Card.Title>
              <Card.Text className="text-gray-600 space-y-2">
                <p className="font-medium">Location: {location}</p>
                <p className="text-sm">Price: {price}</p>
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
