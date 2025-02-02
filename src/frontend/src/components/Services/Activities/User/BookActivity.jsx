import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router";

const BookActivity = ({ book }) => {
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () =>
    userName && userPhoneNumber && date && numberOfPeople;

  const handleNumberOfPeopleChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setNumberOfPeople(parseInt(value || 0)); // Convert valid input to BigInt
    }
  };



  return (
    <>
      <Button
        onClick={handleShow}
        className=" w-[80%] transition duration-150 ease-in-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 hover:scale-110 rounded"
      >
        Book
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Activity</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Name">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Phone Number">
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={userPhoneNumber.toString()}
                  onChange={(e) => setUserPhoneNumber(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Date">
                <Form.Control
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Number of People">
                <Form.Control
                  type="number"
                  placeholder="Number of People"
                  value={numberOfPeople.toString()}
                  onChange={handleNumberOfPeopleChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="dark"
              disabled={!isFormFilled()}
              onClick={() => {
                book({
                  userName,
                  userPhoneNumber,
                  date,
                  numberOfPeople,
                });
                handleClose();
              }}
            >
              Book
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

BookActivity.propTypes = {
  book: PropTypes.func.isRequired,
};

export default BookActivity;
