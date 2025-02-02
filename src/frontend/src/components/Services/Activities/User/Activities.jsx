import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
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

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const resp = await getActivities();
      if (resp) {
        setActivities(resp);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
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
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Activities</h1>
          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center">
              <Loader />
            </div>
          ) : activities.length ? (
            activities.map((activity) => (
              <Activity key={activity.activityId} activity={activity} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No activities available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
