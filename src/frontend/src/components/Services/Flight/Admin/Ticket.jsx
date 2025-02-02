import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Ticket = ({ ticket }) => {
  const {
    ticketId, userName, flightId, } = ticket;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  return (
    <Col>
      <Card
        className="w-[250px] h-[200px]"
       
      >
        <Card.Body>
          <Card.Text>
            <p> Congratulations </p>
            <p> You have successfully booked a ticket </p>
            <p> You can view your ticket details below </p>
            {ticketId}

            <p>{userName}</p>
            <p>{flightId}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

Ticket.propTypes = {
    ticket: PropTypes.object.isRequired,
    };

export default Ticket;
