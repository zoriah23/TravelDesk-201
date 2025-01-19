import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import {

  getActivities,
  getActivity,
  bookActivity,
} from "../../../../utils/endpoints";

import Activity from "./Activity";

const Activities = () => {
  const [loading, setLoading] = useState(false);

  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [show, setShow] = useState(false);
 
  const fetchActivities = async () => {
    try {
      setLoading(true);
      getActivities().then((resp) => {
        if (resp) {
          setActivities(resp);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
 
  const fetchActivity = async (activityId) => {
    try {
      setLoading(true);
      const activity = await getActivity(activityId);
      setActivity(activity);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

   

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Acc</h1>
         
          <Link to="/adoptions?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
            {" "}
            <h1>Activities</h1>
          </Link>
        </div>

        <div className=" flex">
          <Row xs={1} sm={2} lg={3} className="">
            {loading ? (
              <Loader />
            ) : activities.length ? (
              activities.map((activity) => (
                <Activity key={activity.id} activity={activity} />
              ))
            ) : (
              <p>No activities available</p>
            )}
          </Row>
        </div>
      </>
    </>
  );
};

export default Activities;
