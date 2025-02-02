import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Activity = ({ activity }) => {
  const { activityId, activityName, price, location } = activity;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <Col>
      <Card
        className="h-full shadow-md bg-white rounded-lg text-gray-800 px-4 py-3 transition-transform duration-200 hover:shadow-lg hover:bg-gray-100 cursor-pointer"
        onClick={() =>
          navigate(
            `/activityDetails?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&activityId=${activityId}`
          )
        }
      >
        <Card.Body>
          <Card.Title className="text-lg font-semibold">{activityName}</Card.Title>
          <Card.Subtitle className="mb-2 text-gray-600 text-sm">
            {location}
          </Card.Subtitle>
          <Card.Text className="text-gray-500 text-sm">
            <span className="font-medium">Price:</span> {price}
        </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

Activity.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default Activity;
