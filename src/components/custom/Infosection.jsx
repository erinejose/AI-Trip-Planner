// import React, { useState, useEffect } from 'react'
// import { Button } from '../ui/button';
// import { FaShareAlt } from "react-icons/fa";

// function Infosection({trip}) {
//   const [destinationImage, setDestinationImage] = useState('');

//   // Function to get destination image from Unsplash
//   const getDestinationImage = (destination) => {
//     if (!destination) return '';
    
//     // Extract city name from destination (take first part before comma)
//     const cityName = destination.split(',')[0].trim();
//   console.log("Trip data:", trip);

    
//     // Unsplash URL with specific search terms for landmarks/monuments
//     const unsplashUrl = `https://source.unsplash.com/1200x400/?${encodeURIComponent(cityName)},landmark,monument,architecture,travel`;
    
//     return unsplashUrl;
//   };

//   useEffect(() => {
//     if (trip?.userSelection?.destination) {
//       setDestinationImage(getDestinationImage(trip.userSelection.destination));
//     }
//   }, [trip]);

//   return (
//     <div className="mb-8">
//       {/* Hero Image Section */}
//       <div className="relative mb-8">
//         <img 
//           src={destinationImage || `https://source.unsplash.com/1200x400/?travel,destination`}
//           alt={trip?.userSelection?.destination || 'Travel Destination'}
//           className='h-[400px] w-full object-cover rounded-2xl shadow-2xl'
//           onError={(e) => {
//             e.target.src = `https://source.unsplash.com/1200x400/?travel,destination`;
//           }}
//         />
//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-2xl"></div>
        
//         {/* Content overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
//             {trip?.userSelection?.destination}
//           </h1>
//           <div className="flex flex-wrap gap-3">
//             <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold flex items-center">
//               📅 {trip?.userSelection?.days} {trip?.userSelection?.days === '1' ? 'Day' : 'Days'}
//             </span>
//             <span className="px-4 py-2 bg-cyan-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold flex items-center">
//               💰 {trip?.userSelection?.budget} Budget
//             </span>
//             <span className="px-4 py-2 bg-blue-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold flex items-center">
//               👥 {trip?.userSelection?.people}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Action Section */}
//       <div className="flex justify-between items-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
//         <div>
//           <h3 className="text-xl font-semibold text-white mb-2">Your Trip Plan</h3>
//           <p className="text-slate-300">Discover amazing places and experiences</p>
//         </div>
//         <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105">
//           <FaShareAlt className="mr-2" />
//           Share Trip
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default Infosection



import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button';
import { FaShareAlt } from "react-icons/fa";

function Infosection({ trip }) {
  const [destinationImage, setDestinationImage] = useState('');

  // Function to fetch city image from Unsplash API
  const getDestinationImage = async (destination) => {
    if (!destination) return '';

    const cityName = destination.split(',')[0].trim();
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&per_page=1&client_id=J_oekI2MwO3xYLtSHPYZeZgESWwhSDATQsSU7mT1f6c`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular; // Use a decent-sized image
      } else {
        return `https://picsum.photos/1200/400?random=${encodeURIComponent(cityName)}`;
      }
    } catch (error) {
      console.error("Error fetching city image:", error);
      return `https://picsum.photos/1200/400?random=${encodeURIComponent(cityName)}`;
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (trip?.userSelection?.destination) {
        const img = await getDestinationImage(trip.userSelection.destination);
        setDestinationImage(img);
      }
    };
    fetchImage();
  }, [trip]);

  return (
    <div className="mb-8">
      {/* Hero Image Section */}
      <div className="relative mb-8">
        <img 
          src={destinationImage || `https://picsum.photos/1200/400?random=travel`}
          alt={trip?.userSelection?.destination || 'Travel Destination'}
          className='h-[400px] w-full object-cover rounded-2xl shadow-2xl'
          onError={(e) => {
            e.target.src = `https://picsum.photos/1200/400?random=travel`;
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-2xl"></div>
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {trip?.userSelection?.destination}
          </h1>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold flex items-center">
              📅 {trip?.userSelection?.days} {trip?.userSelection?.days === '1' ? 'Day' : 'Days'}
            </span>
            <span className="px-4 py-2 bg-cyan-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold flex items-center">
              💰 {trip?.userSelection?.budget} Budget
            </span>
            <span className="px-4 py-2 bg-blue-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold flex items-center">
              👥 {trip?.userSelection?.people}
            </span>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex justify-between items-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Your Trip Plan</h3>
          <p className="text-slate-300">Discover amazing places and experiences</p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105">
          <FaShareAlt className="mr-2" />
          Share Trip
        </Button>
      </div>
    </div>
  )
}

export default Infosection

