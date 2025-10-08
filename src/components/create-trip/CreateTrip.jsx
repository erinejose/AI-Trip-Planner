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
    <div className="min-h-screen bg-slate-900 text-white pt-24">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 text-sm font-semibold rounded-full border border-emerald-400/30 backdrop-blur-sm mb-6">
            ✨ AI Trip Planning
          </div>
          <h1 className="font-bold text-4xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
            Share your travel preferences with us!
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed max-w-3xl mx-auto">
            Just provide some basic information, and our AI trip planner will craft
            a personalized itinerary for you.
          </p>
        </div>

        {/* Destination Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 relative z-40" style={{ marginBottom: suggestions.length > 0 ? '280px' : '32px' }}>
          <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
            <span className="mr-3">📍</span>
            What is your destination of choice?
          </h2>
          <div className="relative">
            <Input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedPlace(null);
              }}
              placeholder="Enter destination (e.g., Paris, Tokyo, New York)"
              className="w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 p-4 rounded-xl text-lg focus:border-emerald-400 focus:ring-emerald-400/20"
            />
            {loading && <p className="text-emerald-400 text-sm mt-3 flex items-center">
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              Searching destinations...
            </p>}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 w-full bg-slate-800 border border-slate-600 rounded-xl mt-2 shadow-2xl z-50 max-h-60 overflow-y-auto">
                {suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    className="p-4 hover:bg-slate-700 cursor-pointer text-white border-b border-slate-700 last:border-b-0 transition-colors duration-200"
                    onClick={() => handleSelectPlace(place)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">📍</span>
                      {place.display_name}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Days Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
            <span className="mr-3">📅</span>
            How many days are you planning your trip?
          </h2>
          <Input
            type="number"
            placeholder="Enter number of days (1-10)"
            onChange={(e) => handleInputChange("days", e.target.value)}
            className="w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 p-4 rounded-xl text-lg focus:border-emerald-400 focus:ring-emerald-400/20"
            min="1"
            max="10"
          />
        </div>

        {/* Budget Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
            <span className="mr-3">💰</span>
            What is your Budget?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  formData.budget === item.title
                    ? "border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                    : "border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700"
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
            <span className="mr-3">👥</span>
            Who do you plan to travel with?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  formData.people === item.people
                    ? "border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                    : "border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700"
                }`}
                onClick={() => handleInputChange("people", item.people)}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Generate Trip Button */}
          <div className="flex justify-center">
            <Button 
              disabled={loading} 
              onClick={onGenerateTrip}
              className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center">
                  <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin mr-3" />
                  Generating Trip...
                </div>
              ) : (
                "Generate Trip"
              )}
            </Button>
          </div>
        </div>

        {/* Sign In Dialog */}
        <Dialog open={openDialogBox} onOpenChange={setOpenDialogBox}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogDescription>
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-white text-2xl mb-4">
                    Sign in to Continue
                  </h3>
                  <p className="text-slate-300 mb-8">
                    Sign in with Google to save and access your personalized trip plans
                  </p>
                  <Button
                    onClick={login}
                    className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-200 hover:scale-105"
                  >
                    <FcGoogle className="h-6 w-6" /> 
                    Sign in with Google
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
