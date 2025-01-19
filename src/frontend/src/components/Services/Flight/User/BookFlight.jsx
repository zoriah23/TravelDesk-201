import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookFlight = ({ book }) => {
  const [userName, setUserName] = useState("");
  const [flightClass, setFlightClass] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");

  const isFormFilled = () => userName && flightClass && numberOfSeats;

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/confirmation?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSeatsChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setNumberOfSeats(parseInt(value || 0)); // Convert valid input to BigInt
    }
  };

  return (
    <>
      <Button onClick={handleShow} className=" bg-black text-white ">
        <i className="bi bi-plus"></i>
        <span className=" fs-6"> Book Flight</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="User Name">
                <Form.Control
                  type="text"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFlightClass">
              <FloatingLabel controlId="floatingSelect" label="Filght Class">
                <Form.Select
                  value={flightClass}
                  onChange={(e) => setFlightClass(e.target.value)} // Update state with selected value
                >
                  <option value="" disabled>
                    Select Flight Class
                  </option>
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First Class</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Number of Seats">
                <Form.Control
                  type="text"
                  placeholder="Number of Seats"
                  value={numberOfSeats.toString()}
                  onChange={handleSeatsChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (isFormFilled()) {
                  book({ userName, flightClass, numberOfSeats });
                  handleClose();
                  handleNavigate();
                }
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

BookFlight.propTypes = {
  book: PropTypes.func.isRequired,
};

export default BookFlight;
