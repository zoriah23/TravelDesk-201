import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const AddFlight = ({ save }) => {
  const [airline, setAirline] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [flightClass, setFlightClass] = useState([
    { className: "Economy", price: 0, availableSeats: 0 },
    { className: "Business", price: 0, availableSeats: 0 },
    { className: "First", price: 0, availableSeats: 0 },
  ]);
  const [totalSeats, setTotalseats] = useState("");
  const [typeOfPlane, setTypeOfPlane] = useState("");
  const [departure, setDeparture] = useState("");

  const [flightType, setFlightType] = useState("");

  const isFormFilled = () =>
    airline &&
    destination &&
    departureTime &&
    arrivalTime &&
    basePrice &&
    flightClass &&
    totalSeats &&
    typeOfPlane &&
    departure &&
    flightType;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePriceChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setBasePrice(BigInt(value || 0)); // Convert valid input to BigInt
    }
  };

  const handleAvailableSeatsChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setTotalseats(parseInt(value || 0)); // Convert valid input to BigInt
    }
  };

  const handleFlightClassChange = (index, field, value) => {
    const updatedClasses = [...flightClass];
    updatedClasses[index][field] = value;
    setFlightClass(updatedClasses);
  };

  return (
    <>
      <Button onClick={handleShow} className=" bg-black text-white ">
        <i className="bi bi-plus"></i>
        <span className=" fs-6"> Add Flight</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Airline">
                <Form.Control
                  type="text"
                  placeholder="Airline"
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Destination">
                <Form.Control
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Departure">
                <Form.Control
                  type="text"
                  placeholder="Departure"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Departure Time">
                <Form.Control
                  type="datetime-local" // Allows date and time selection
                  placeholder="Departure Time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)} // Update state
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formArrivalTime">
              <FloatingLabel controlId="floatingInput" label="Arrival Time">
                <Form.Control
                  type="datetime-local" // Allows date and time selection
                  placeholder="Arrival Time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)} // Update state
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Price">
                <Form.Control
                  type="text"
                  placeholder="Price"
                  value={basePrice.toString()} // Display BigInt as a string
                  onChange={handlePriceChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              {flightClass.map((cls, index) => (
                <Row key={index} className="mb-3">
                  <Col>
                    <Form.Control type="text" value={cls.className} readOnly />
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId={`price-${index}`}
                      label={`${cls.className} Price`}
                    >
                      <Form.Control
                        type="number"
                        placeholder={`${cls.className} Price`}
                        value={cls.price}
                        onChange={(e) =>
                          handleFlightClassChange(
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId={`seats-${index}`}
                      label={`${cls.className} Available Seats`}
                    >
                      <Form.Control
                        type="number"
                        placeholder={`${cls.className} Available Seats`}
                        value={cls.availableSeats}
                        onChange={(e) =>
                          handleFlightClassChange(
                            index,
                            "availableSeats",
                            e.target.value
                          )
                        }
                        required
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              ))}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Available Seats">
                <Form.Control
                  type="text"
                  placeholder="Available Seats"
                  value={totalSeats}
                  onChange={handleAvailableSeatsChange}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaneType">
              <FloatingLabel controlId="floatingSelect" label="Type of Plane">
                <Form.Select
                  value={typeOfPlane}
                  onChange={(e) => setTypeOfPlane(e.target.value)} // Update state with selected value
                >
                  <option value="" disabled>
                    Select Plane Type
                  </option>
                  <option value="Boeing 737">Boeing 737</option>
                  <option value="Airbus A320">Airbus A320</option>
                  <option value="Embraer E175">Embraer E175</option>
                  <option value="Boeing 747">Boeing 747</option>
                  <option value="Airbus A380">Airbus A380</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Flight Type">
                <Form.Select
                  value={flightType}
                  onChange={(e) => setFlightType(e.target.value)}
                >
                  <option value="" disabled>
                    Select Flight Type
                  </option>
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </Form.Select>
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
                  save({
                    destination,
                    basePrice,
                    flightClass: flightClass.map((cls) => ({
                      [cls.className]: {
                        price: parseInt(cls.price, 10),
                        availableSeats: parseInt(cls.availableSeats, 10),
                      },
                    })),

                    totalSeats,
                    airline,
                    departureTime,
                    arrivalTime,
                    typeOfPlane,
                    departure,
                    flightType,
                  });
                  handleClose();
                }
                console.log("flight details", {
                  destination,
                  basePrice,
                  flightClass,
                  totalSeats,
                  airline,
                  departureTime,
                  arrivalTime,
                  typeOfPlane,
                  departure,
                  flightType,
                });
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

AddFlight.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddFlight;
