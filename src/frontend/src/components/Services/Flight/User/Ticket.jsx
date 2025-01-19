import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import { useLocation, useNavigate } from "react-router-dom";
import {getTickets} from "../../../../utils/endpoints";
const Ticket = () => {
 
  const location = useLocation();
  

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});

    //fetch tickets
    const fetchTickets = async () => {
        try {
            const tickets = await getTickets();
            setTickets(tickets);
            setLoading(false);
            console.log("tickets", tickets);
        } catch (error) {
            setLoading(false);
            NotificationError("Error", "Failed to fetch tickets");
        }
    };

    useEffect(() => {   
        fetchTickets();
    }
    , [fetchTickets]);

    //fetch ticket
    const fetchTicket = async (ticketId) => {
        try {
            setLoading(true);
            const ticket = await getTickets(ticketId);
            setTicket(ticket);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            NotificationError("Error", "Failed to fetch ticket");
        }
    };

    useEffect(() => {
        fetchTicket();
    }
    , []);

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
