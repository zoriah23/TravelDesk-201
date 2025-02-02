import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const BookHotel = ({ book }) => {
  const [userName, setUserName] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [typeOfRoom, setTypeOfRoom] = useState("");

  const isFormFilled = () =>
    userName && numberOfRooms && duration && date && userPhoneNumber;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNumberOfRooms = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setNumberOfRooms(BigInt(value || 0)); // Convert valid input to BigInt
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Book Hotel
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Title>Book Hotel</Modal.Title>
          <Modal.Body>
            <FloatingLabel controlId="floatingInput" label="User Name">
              <Form.Control
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="User Phone Number">
              <Form.Control
                type="text"
                placeholder="User Phone Number"
                value={userPhoneNumber}
                onChange={(e) => setUserPhoneNumber(e.target.value)}
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
            <FloatingLabel controlId="floatingInput" label="Date">
              <Form.Control
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
            <FloatingLabel controlId="floatingInput" label="Type of Room">
              <Form.Select
                aria-label="Type of Room"
                value={typeOfRoom}
                onChange={(e) => setTypeOfRoom(e.target.value)}
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </Form.Select>
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
                  book({
                    userName,
                    userPhoneNumber,
                    numberOfRooms,
                    duration,
                    date,
                    typeOfRoom,
                  });
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
