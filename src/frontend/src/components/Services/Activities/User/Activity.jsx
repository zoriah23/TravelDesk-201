import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Activity = ({ activity }) => {
  const { activityId, activityName, price, location, duration } = activity;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <Col>
      <Card
        className="w-[200px] h-[300px]"
        onClick={() =>
          navigate(`/activityInfo?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai&activityName=${activityName}`)
        }
      >
        <Card.Body>
          <Card.Title>Activity: {activityName}</Card.Title>
          <Card.Text>
            <p>Price: {price}</p>
            <p>Location: {location}</p>
            <p>Duration: {duration}</p>
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
