import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap";

const AddHotel = ({ save }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [typeOfRoom, setTypeOfRoom] = useState([
    { roomType: "Single", price: 0, availableRooms: 0 },
    { roomType: "Double", price: 0, availableRooms: 0 },
    { roomType: "Suite", price: 0, availableRooms: 0 },
  ]);
  const [price, setPrice] = useState("");
  const [numberofRooms, setNumberofRooms] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);

  const isFormFilled = () =>
    name &&
    location &&
    typeOfRoom.length &&
    price &&
    numberofRooms &&
    description &&
    amenities.length;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(BigInt(value || 0));
    }
  };

  const handleRoomTypeChange = (index, field, value) => {
    const updatedTypes = [...typeOfRoom];
    updatedTypes[index][field] = value;
    setTypeOfRoom(updatedTypes);
  };

  const amenitiesOptions = [
    "WiFi",
    "Parking",
    "Pool",
    "Gym",
    "Spa",
    "Restaurant",
  ];

  const handleAmenitiesChange = (event) => {
    const { value, checked } = event.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((amenity) => amenity !== value)
    );
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Hotel
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Body className="space-y-4">
            <FloatingLabel controlId="hotelName" label="Name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="hotelLocation" label="Location">
              <Form.Control
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="roomTypes">
              <div className="">
                {typeOfRoom.map((room, index) => (
                  <Row key={index} className="mb-3">
                    <Col>
                      <Form.Control
                        type="text"
                        value={room.roomType}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <FloatingLabel
                        controlId={`price-${index}`}
                        label={`${room.roomType} Price`}
                      >
                        <Form.Control
                          type="number"
                          placeholder={`${room.roomType} Price`}
                          value={room.price}
                          onChange={(e) =>
                            handleRoomTypeChange(index, "price", e.target.value)
                          }
                          required
                        />
                      </FloatingLabel>
                    </Col>

                    <Col>
                      <FloatingLabel
                        controlId={`seats-${index}`}
                        label={`${room.roomType} Available Rooms`}
                      >
                        <Form.Control
                          type="number"
                          placeholder={`${room.roomType} Available Rooms`}
                          value={room.availableRooms}
                          onChange={(e) =>
                            handleRoomTypeChange(
                              index,
                              "availableRooms",
                              e.target.value
                            )
                          }
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                ))}
              </div>
            </FloatingLabel>
            <FloatingLabel controlId="hotelPrice" label="Price">
              <Form.Control
                type="text"
                placeholder="Price"
                value={price.toString()}
                onChange={handleInputChange(setPrice)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="numRooms" label="Number of Rooms">
              <Form.Control
                type="text"
                placeholder="Number of Rooms"
                value={numberofRooms.toString()}
                onChange={handleInputChange(setNumberofRooms)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="hotelDescription" label="Description">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formBasicEmail" >
              <Form.Label className="pb-6">Amenities</Form.Label>
              <div className="">
                {amenitiesOptions.map((amenity) => (
                  <Form.Check
                    key={amenity}
                    type="checkbox"
                    label={amenity}
                    value={amenity}
                    checked={amenities.includes(amenity)}
                    onChange={handleAmenitiesChange}
                  />
                ))}
              </div>
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
                  save({
                    name,
                    location,
                    typeOfRoom: typeOfRoom.map((room) => ({
                      [room.roomType]: {
                        price: parseInt(room.price, 10),
                        availableRooms: parseInt(room.availableRooms, 10),
                      },
                    })),
                    price,
                    numberofRooms,
                    description,
                    amenities,
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

AddHotel.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddHotel;
