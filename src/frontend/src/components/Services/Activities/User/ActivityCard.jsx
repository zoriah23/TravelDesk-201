import React, { act, useEffect, useState } from "react";

import { getActivityCards, getActivityCard } from "../../../../utils/endpoints";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../utlis/Notifications";
import { useLocation } from "react-router";

const ActivityCard = () => {
  const [loading, setLoading] = useState(false);
  const [activityCard, setActivityCard] = useState({});
  const [activityCards, setActivityCards] = useState([]);
  const [show, setShow] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activityCardId = params.get("activityCardId");
 

  //fetch activity card
  const fetchActivityCard = async (id) => {
    try {
      setLoading(true);
      getActivityCard(id).then((resp) => {
        if (resp) {
          setActivityCard(resp);
          setShow(true);
        }
      });
      setLoading(false);
     
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityCard(activityCardId);
  }, [activityCardId]);
 console.log("activityCard", activityCard);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!loading ? (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-4">Activity Info</h1>
          <div className="space-y-2 text-center">
            <p className="text-gray-700 font-medium">
              Activity Card ID: {activityCardId}
            </p>
            <h1 className="text-xl font-semibold">{activityCard.userName}</h1>
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      )}
    </div>
  );
};

export default ActivityCard;
