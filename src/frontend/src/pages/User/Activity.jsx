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
import { useLocation, useNavigate } from "react-router-dom";
import BookActivity from "../../components/Services/Activities/User/BookActivity";

const ActivityPage = () => {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [show, setShow] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activityId = params.get("activityId");
  const activityCardId = params.get("activityCardId");
  console.log("activityCardId", activityCardId);

   const navigate = useNavigate();

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

  const getActivity = async () => {
    try {
      const activities = await getActivities();
      const activity = activities.find(
        (activity) => activity.activityId === activityId
      );
      setActivity(activity);
      console.log("activity", activity);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getActivity();
  }, [activityId]);

  useEffect(() => {
    fetchActivities();
  });

  const book = async (activityCard, activityId) => {
    try {
      setLoading(true);
      bookActivity(activityCard, activityId).then((resp) => {
        if (resp) {
          NotificationSuccess("Activity booked successfully");
        } else {
          NotificationError("Failed to book activity");
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const triggerBook = ( {userName, date, userPhoneNumber, numberOfPeople} ) => {
    const activityCard = {
      userName,
      date,
      userPhoneNumber,
      numberOfPeople,
    };

    book(activityCard, activityId);
    console.log("details", activityCard);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!loading ? (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-4">Activity Info</h1>
          <div className="space-y-2">
            <p className="text-gray-700">Activity ID: {activityId}</p>
            <h1 className="text-xl font-semibold">
              Activity Name: {activity.name}
            </h1>
            <h1 className="text-xl font-semibold">Price: {activity.price}</h1>
            <h1 className="text-xl font-semibold">
              Location: {activity.location}
            </h1>
            <h1 className="text-xl font-semibold">
              Duration: {activity.duration}
            </h1>
          </div>
          <div className="mt-4 flex flex-col space-y-3">
            <BookActivity book={triggerBook} />
            <button
              onClick={() =>
                navigate(
                  `/activityCard?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&activityCardId=${activityCardId}`
                )
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              View Card
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      )}
    </div>
  );
};




export default ActivityPage;
