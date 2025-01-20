import React, { act, useEffect, useState } from "react";

import {
  getActivities,
  getActivity,
  bookActivity,
} from "../../utils/endpoints";
import {
  NotificationError,
  NotificationSuccess,
} from "../../components/utlis/Notifications";
import { useLocation } from "react-router";
import BookActivity from "../../components/Services/Activities/User/BookActivity";

const ActivityPage = () => {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [show, setShow] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activityId = params.get("activityId");

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
  }


  const getActivity = async () => {
    try {
     const activities = await getActivities();
      const activity = activities.find((activity) => activity.activityId === activityId);
      setActivity(activity);
      console.log("activity", activity);
    }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getActivity();
  }, [activityId]);

  useEffect(() => {
    fetchActivities();

  });

  const book = async (activityId) => {
    try {
      setLoading(true);
      await bookActivity(activityId);
      NotificationSuccess("Activity booked successfully");
      console.log("Activity booked successfully");
      setLoading(false);
    } catch (error) {
      NotificationError("Error booking activity");
      setLoading(false);
    }
  };

  const triggerBook = (userName, date, userPhoneNumber, NumberofPeople ) => {
    book({ activityId: activityId,
        userName,
        userPhoneNumber,
        date,
        NumberofPeople
     });
  }


  return (
    <>
      {!loading ? (
        <div>
          <h1>Activity Info</h1>
          <div>
            {activityId}
            <h1>Activity Name: {activity.name}</h1>
            <h1>Price: {activity.price}</h1>
            <h1>Location: {activity.location}</h1>
            <h1>Duration: {activity.duration}</h1>
          </div>
          <BookActivity book={triggerBook} />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default ActivityPage;
