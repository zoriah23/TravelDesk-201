import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link, useParams } from "react-router-dom";

import {
  getActivities,
  getActivity,
  addActivity,
} from "../../../../utils/endpoints";

const ActivityList = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [list, setList] = useState(false);
  const [activity, setActivity] = useState({});

  const activityName = useParams.get("activityName");

  const fetchList = async () => {
    try {
      setLoading(true);
      getActivities().then((resp) => {
        if (resp) {
          setList(resp);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchList;
  }, []);

  const getActivity = async () => {
    try {
      const activities = await getActivities();
      const activity = activities.find((activity) => activity.id === activityName);
      setFlight(activity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   getActivity()
  }, [activityName]);

  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Flights</h1>
        </div>

        <div className=" flex">
          <Row xs={1} sm={2} lg={3} className="">
            {loading ? (
              <Loader />
            ) : list.length ? (
              list.map((activity) => (
                <div key={activity.id} list={list}>
                  <h1>Activity Name:{activity.name}</h1>
                  <h1>Paticipants</h1>
                  <p>{activity.paticipants}</p>
                </div>
              ))
            ) : (
              <h1>No Details</h1>
            )}
          </Row>
        </div>
      </>
    </>
  );
};

export default ActivityList;
