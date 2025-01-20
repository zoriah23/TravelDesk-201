import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const BookHotel = ({ book }) => {
  const [userName, setUserName] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [typeOfRoom, setTypeOfRoom] = useState("");
  const [duration, setDuration] = useState("");

  const isFormFilled = () => userName && numberOfRooms && typeOfRoom && duration;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNumberOfRooms = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setNumberOfRooms(BigInt(value || 0)); // Convert valid input to BigInt
    }
  }

  return (
    <>
      <Button onClick={handleShow} className=" bg-black text-white ">
        <i className="bi bi-plus"></i>
        <span className=" fs-6"> Book Hotel</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <h1>Book Hotel</h1>
          <Modal.Body>
            <FloatingLabel controlId="floatingInput" label="User Name">
              <Form.Control
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Number of Rooms">
              <Form.Control
                type="number"
                placeholder="Number of Rooms"
                value={numberOfRooms.toString()}
                onChange={handleNumberOfRooms}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Room Type">
              <Form.Control
                type="text"
                placeholder="Room Type"
                value={typeOfRoom}
                onChange={(e) => setTypeOfRoom(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Duration">
              <Form.Control
                type="text"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (isFormFilled()) {
                  book({ userName, numberOfRooms, typeOfRoom, duration });
                  handleClose();
                }
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

BookHotel.propTypes = {
    book: PropTypes.func.isRequired,
    };  
    export default BookHotel;
