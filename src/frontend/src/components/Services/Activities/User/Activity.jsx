import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Activity = ({ activity }) => {
  const { activityId, activityName, price, location, duration, equipment } = activity;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <div className="p-4">
      <Card
        className="w-52 h-72 shadow-lg rounded-lg cursor-pointer"
        onClick={() =>
          navigate(
            `/activityInfo?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&activityId=${activityId}`
          )
        }
      >
        <Card.Body className="text-center">
          <Card.Title className="text-lg font-bold">
            Activity: {activityName}
          </Card.Title>
          <Card.Text className="text-gray-600 space-y-2">
            <p>Price: {price}</p>
            <p>Location: {location}</p>
            <p>Duration: {duration}</p>
            <p>Equipment: {equipment}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

Activity.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default Activity;
