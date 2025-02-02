import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Row } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import {
  getActivities,
  getActivity,
  addActivity,
  getActivityCards,
  getActivityCard,
} from "../../../../utils/endpoints";

import Activity from "./ActivitiesCard";
import AddActivity from "./AddActivities";

const Activities = () => {
  const [loading, setLoading] = useState(false);

  const [activities, setActivities] = useState([]);
  
  const [activityCard, setActivityCard] = useState({});

  //fetch all activities
  const fetchActivities = useCallback(async () => {
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
  }, []);

  //create activity
  const createActivity = async (activity) => {
    try {
      setLoading(true);
      addActivity(activity).then((resp) => {
        if (resp) {
          NotificationSuccess("Activity added successfully");
          fetchActivities();
        } else {
          NotificationError("Failed to add activity");
        }
      });
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
      {!loading ? (
        <>
          <div className="relative w-full p-4 bg-white shadow-md rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-gray-800">Activities</h1>
              <div>
              <AddActivity createActivity={createActivity} />
              </div>
            </div>

          
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center items-center h-20">
                  <Loader />
                </div>
              ) : (
                activities.map((activity) => (
                  <Activity key={activity.activityId} activity={activity} />
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Activities;
