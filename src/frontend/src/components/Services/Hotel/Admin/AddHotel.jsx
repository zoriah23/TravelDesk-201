import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddHotel = ({ save }) => {
 const [name, setName] = useState("");
 const [location, setLocation] = useState("");
 const [ typeOfRoom, setTypeOfRoom] = useState("");
  const [price, setPrice] = useState("");
  const [numberofRooms, setNumberofRooms] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [availableRooms, setAvailableRooms] = useState("");
  


  const isFormFilled = () => name && location && typeOfRoom && price && numberofRooms && description && amenities;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleNumberOfRooms = (e) => {
      const value = e.target.value;

      // Allow only numbers
      if (/^\d*$/.test(value)) {
        setNumberofRooms(BigInt(value || 0)); // Convert valid input to BigInt
      }
    };

    const handlePrice = (e) => {
      const value = e.target.value;

      // Allow only numbers
      if (/^\d*$/.test(value)) {
        setPrice(BigInt(value || 0)); // Convert valid input to BigInt
      }
    }

    const handleAvailableRooms = (e) => {
      const value = e.target.value;

      // Allow only numbers
      if (/^\d*$/.test(value)) {
        setAvailableRooms(BigInt(value || 0)); // Convert valid input to BigInt
      }
    }

  return (
    <>
      <Button onClick={handleShow} className=" bg-black text-white ">
        <i className="bi bi-plus"></i>
        <span className=" fs-6"> Add Hotel</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId="floatingInput" label="Name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Location">
              <Form.Control
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Type of Room">
              <Form.Control
                type="text"
                placeholder="Type of Room"
                value={typeOfRoom}
                onChange={(e) => setTypeOfRoom(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Price">
              <Form.Control
                type="text"
                placeholder="Price"
                value={price.toString()}
                onChange={handlePrice}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Number of Rooms">
              <Form.Control
                type="text"
                placeholder="Number of Rooms"
                value={numberofRooms.toString()}
                onChange={handleNumberOfRooms}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Description">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Amenities">
              <Form.Control
                type="text"
                placeholder="Amenities"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Available Rooms">
              <Form.Control
                type="text"
                placeholder="Available Rooms"
                value={availableRooms.toString()}
                onChange={handleAvailableRooms}
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
                  save({ name, location, typeOfRoom, price, numberofRooms, description, amenities, availableRooms });
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

AddHotel.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddHotel;
