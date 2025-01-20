import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Row } from "react-bootstrap";
 import {
   NotificationSuccess,
   NotificationError,
 } from "../../../utlis/Notifications";
import { Link } from "react-router-dom";

import {
  getActivities  ,
  getActivity,
  addActivity,
} from "../../../../utils/endpoints";

import Activity from "./ActivitiesCard";
import AddActivity from "./AddActivities";

const Activities = () => {
  const [loading, setLoading] = useState(false);

  const [activities, setActivities] = useState([]);
  

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
       }
       );
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
           <div className=" justify-content-between align-items-center mb-4">
             <h1 className="fs-4 fw-bold mb-0">AcTivities</h1>
            <AddActivity createActivity={createActivity} />

           
         </div>

           <div className=" flex">
             <Row xs={1} sm={2} lg={3} className="">
               {activities.map((_activityInfo, index) => (
                 <Activity
                   key={index}
                   activity={{
                     ..._activityInfo,
                   }}
                 />
               ))}
             </Row>
           </div>
         </>
       ) : (
         <div>Loading...</div>
       )}
     </>
  
  );
};

export default Activities;
