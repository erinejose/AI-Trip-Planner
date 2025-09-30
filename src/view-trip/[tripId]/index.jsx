import React, { useEffect,useState } from "react";
import { useParams } from "react-router";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../service/FirebaseConfig.jsx";
import { toast } from "react-toastify";
import Infosection from "@/components/custom/Infosection.jsx";
import Hotels from "@/components/custom/Hotels.jsx";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  //fetch data method
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("No Trip Found!");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* information section */}
      <Infosection trip={trip}/>

      {/* recommended hotels */}
      <Hotels trip={trip}/>

      {/* daily plan */}

      {/* footer */}
    </div>
  );
}

export default ViewTrip;
