import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../../utlis/Loader";
import { Row, Table } from "react-bootstrap";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../utlis/Notifications";
import { Link, useLocation, useParams } from "react-router-dom";

import { getActivities, getActivityCards } from "../../../../utils/endpoints";

const ActivityList = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [activityCards, setActivityCards] = useState([]);
  const [activity, setActivity] = useState({});
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activityId = params.get("activityId");

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

  //fetch all activity cards
  const fetchActivityCards = async () => {
    try {
      setLoading(true);
      getActivityCards().then((resp) => {
        if (resp) {
          setActivityCards(resp);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityCards();
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-screen-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Activity Details</h1>
      </div>

      {activity ? (
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50 shadow-md">
          <p>
            <strong>Activity:</strong>
            {activity.activityName}
          </p>
          <p>
            <strong>Activity ID:</strong> {activityId}
          </p>
          <p>
            <strong>Location:</strong>
            {activity.location}
          </p>
          <p>
            <strong>Price:</strong> ${activity.price}
          </p>

          <p>
            <strong>Activity Duration:</strong> {activity.duration}
          </p>

        </div>
      ) : (
        <p className="text-gray-500"> activity details not available.</p>
      )}

      {/* Tickets Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Participant List</h3>
        {loading ? (
          <Loader />
        ) : activityCards.length ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 shadow-md rounded-lg bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Card ID</th>
                  <th className="py-2 px-4 text-left">User Name</th>
                  <th className="py-2 px-4 text-left">User Phone Number</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Participants</th>
                  <th className="py-2 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {activityCards.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-2 px-4 text-center text-gray-500"
                    >
                      No Participants available
                    </td>
                  </tr>
                ) : (
                  activityCards.map((card, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="py-2 px-4">{card.activityCardId}</td>
                      <td className="py-2 px-4">{card.userName}</td>
                      <td className="py-2 px-4">{card.userPhoneNumber}</td>
                      <td className="py-2 px-4">{card.date}</td>
                      <td className="py-2 px-4">{card.numberOfPeople}</td>
                     
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No participants available.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
