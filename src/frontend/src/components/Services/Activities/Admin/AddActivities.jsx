import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddActivity = ({ createActivity }) => {
  const [activityName, setActivityName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [equipment, setEquipment] = useState("");

  const isFormFilled = () => activityName && price && location && duration;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handlePriceChange = (e) => {
      const value = e.target.value;

      // Allow only numbers
      if (/^\d*$/.test(value)) {
        setPrice(BigInt(value || 0)); // Convert valid input to BigInt
      }
    };

  return (
    <>
      <Button onClick={handleShow} className=" bg-black text-white ">
        <i className="bi bi-plus"></i>
        <span className=" fs-6"> Add Activity</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Activity">
                <Form.Control
                  type="text"
                  placeholder="Activity"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Price">
                <Form.Control
                  type="text"
                  placeholder="Price"
                  value={price.toString()}
                  onChange={handlePriceChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Location">
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Duration">
                <Form.Control
                  type="text"
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Equipment">
                <Form.Control
                  type="text"
                  placeholder="Equipment"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
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
                  createActivity({ activityName, price, location, duration, equipment });
                  handleClose();
                  console.log({ activityName, price, location, duration, equipment });
                }
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

AddActivity.propTypes = {
  createActivity: PropTypes.func.isRequired,
};

export default AddActivity;
