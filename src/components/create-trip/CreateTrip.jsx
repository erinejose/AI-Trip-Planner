import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { Button } from "../ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../service/FirebaseConfig.jsx";
import { useNavigation,useNavigate } from "react-router";




export default function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    people: "",
  });
  const [openDialogBox, setOpenDialogBox] = useState(false);

  // const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    if (!query || selectedPlace === query) {
      setSuggestions([]);
      return;
    }

    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: { q: query, format: "json", addressdetails: 1, limit: 5 },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchPlaces, 300);
    return () => clearTimeout(delay);
  }, [query]);


  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSelectPlace = (place) => {
    setQuery(place.display_name);
    setSelectedPlace(place.display_name);
    setSuggestions([]);
    handleInputChange("destination", place.display_name);
  };

  //whenever login is successful this method is call
  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
          params: { access_token: tokenInfo?.access_token },
        }
      );
      console.log("User Profile:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data)); //whatever data we get is json to store it in localstorage we need to convert to string
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setOpenDialogBox(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await getUserProfile(tokenResponse);
    },
    onError: (error) => console.error("Google login failed", error),
  });

  //Add new document in collection AITrips and storing in firebase
  //basically to store data in firebasde can create this inside saveaitrip meth also
  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user")); //when we login we also save user info ,localStorage store everything as strings

    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email, //optional chaining,in case if user is null it stops there and not returns nukll
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  };



  //what all happens when generate trip button is clicked

  const onGenerateTrip = async () => 
  {
    const user = localStorage.getItem("user");

    if (!user) 
    {
      setOpenDialogBox(true);
      return;
    }

    const { destination, days, budget, people } = formData;

    if (!destination.trim()) {
      toast.error("Please enter a destination!", { autoClose: 2000 });
      return;
    }
    if (!days || Number(days) <= 0 || Number(days) > 10) {
      toast.error("Please enter a valid number of days (1-10)!", {
        autoClose: 2000,
      });
      return;
    }
    if (!budget) {
      toast.error("Please select a budget!", { autoClose: 2000 });
      return;
    }
    if (!people) {
      toast.error("Please select who you are traveling with!", {
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{place}", destination)
      .replace("{days}", days)
      .replace("{people}", people)
      .replace("{budget}", budget);

    console.log("Final Prompt:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      console.log("AI Response:", result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
    }
  };




  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10  ">
      <h2 className="font-bold text-3xl">
        Share your travel preferences with us!
      </h2>
      <p className="mt-3 text-gray-600 text-xl">
        Just provide some basic information, and our AI trip planner will craft
        a personalized itinerary for you.
      </p>

      <div className="p-5">
        <h2 className="text-xl mt-5">What is your destination of choice?</h2>
        <Input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedPlace(null);
          }}
          placeholder="Enter destination"
          className="w-full border p-3 rounded-lg shadow-md"
        />
        {loading && <p className="text-gray-500 text-sm mt-2">Loading...</p>}
        {suggestions.length > 0 && (
          <ul className="absolute left-0 w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
            {suggestions.map((place) => (
              <li
                key={place.place_id}
                className="p-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectPlace(place)}
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-xl mt-5">
          How many days are you planning your trip?
        </h2>
        <Input
          type="number"
          placeholder="Ex-3"
          onChange={(e) => handleInputChange("days", e.target.value)}
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl mt-5">What is your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-5 border rounded-lg cursor-pointer hover:shadow-lg ${
                formData.budget === item.title
                  ? "shadow-gray-500 border-black"
                  : ""
              }`}
              onClick={() => handleInputChange("budget", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl mt-5">Who do you plan to travel with?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 mb-3">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg cursor-pointer hover:shadow-lg p-5 ${
                formData.people === item.people
                  ? "shadow-gray-500 border-black"
                  : ""
              }`}
              onClick={() => handleInputChange("people", item.people)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-5">
          {/* button is disabled when loading is true is when trip is being generated */}
          <Button disabled={loading} onClick={onGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDialogBox} onOpenChange={setOpenDialogBox}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <h6 className="font-bold text-black  text-center text-lg mt-7">
                  Sign in with Google
                </h6>
                <Button
                  onClick={login}
                  className=" mt-5 ml-28 w-60 flex gap-4 items-center "
                  style={{ backgroundColor: "black" }}
                >
                  <FcGoogle className="h-7 w-7" /> SIGN IN WITH GOOGLE
                </Button>
                {/* <h2>Login</h2> */}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
}
