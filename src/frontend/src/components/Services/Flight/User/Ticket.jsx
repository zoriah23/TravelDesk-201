import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import {getTicket} from "../../../../utils/endpoints";
const Ticket = () => {
 
  const location = useLocation();
    const params = new URLSearchParams(location.search);
  const ticketId = params.get("ticketId");
  

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
   // const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});

    
    //fetch ticket
    const fetchTicket = async () => {
        try {
            setLoading(true);
            getTicket(ticketId).then((resp) => {
                if (resp) {
                    setTicket(resp);
                }
            });
            console.log("ticket", ticket);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicket();
    }
    , [ticketId]);

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
