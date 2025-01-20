import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Activity = ({ activity }) => {
  const { activityId, activityName, price, location, duration, equipment } = activity;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <Col>
      <Card
        className="w-[200px] h-[300px]"
        onClick={() =>
          navigate(
            `/activityInfo?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&activityId=${activityId}`
          )
        }
      >
        <Card.Body>
          <Card.Title>Activity: {activityName}</Card.Title>
          <Card.Text>
            <p>Price: {price}</p>
            <p>Location: {location}</p>
            <p>Duration: {duration}</p>
            <p>Equipment: {equipment}</p>
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
