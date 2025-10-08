import React, { useEffect,useState } from "react";
import { useParams } from "react-router";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../service/FirebaseConfig.jsx";
import { toast } from "react-toastify";
import Infosection from "@/components/custom/Infosection.jsx";
import Hotels from "@/components/custom/Hotels.jsx";
import PlacestoVisit from "@/components/custom/PlacestoVisit.jsx";

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
    <div className="min-h-screen bg-slate-900 pt-24">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* information section */}
        <Infosection trip={trip}/>

        {/* recommended hotels */}
        <Hotels trip={trip}/>

        {/* daily plan */}
        <PlacestoVisit trip={trip}/>

        {/* footer */}
      </div>
    </div>
  );
}

export default ViewTrip;
