

// import React, { useState, useEffect } from 'react';

// function PlacestoVisit({ trip }) {
//   const [placeImages, setPlaceImages] = useState({});

//   // Function to fetch image from Unsplash for a place
//   const getPlaceImage = async (placeName) => {
//     try {
//       const response = await fetch(
//         `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&per_page=1&client_id=J_oekI2MwO3xYLtSHPYZeZgESWwhSDATQsSU7mT1f6c`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         return data.results[0].urls.small;
//       } else {
//         return `https://source.unsplash.com/400x300/?${encodeURIComponent(placeName)}`;
//       }
//     } catch (error) {
//       console.error("Error fetching place image:", error);
//       return `https://source.unsplash.com/400x300/?${encodeURIComponent(placeName)}`;
//     }
//   };

//   useEffect(() => {
//     const fetchImages = async () => {
//       if (!trip?.tripData?.itinerary) return;

//       const images = {};
//       for (const [dayKey, dayData] of Object.entries(trip.tripData.itinerary)) {
//         for (const [timeKey, place] of Object.entries(dayData)) {
//           if (place?.placeName) {
//             const img = await getPlaceImage(place.placeName);
//             images[place.placeName] = img;
//           }
//         }
//       }
//       setPlaceImages(images);
//     };
//     fetchImages();
//   }, [trip]);

//   return (
//     <div className="mb-8">
//       <h2 className='font-bold text-2xl text-white mb-4'>Places to Visit</h2>

//       <div className="space-y-6">
//         {trip?.tripData?.itinerary &&
//           Object.entries(trip.tripData.itinerary).map(([dayKey, dayData], dayIndex) => (
//             <div key={dayKey} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
//               <h3 className="font-bold text-xl text-emerald-400 mb-4">Day {dayIndex + 1}</h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//                 {Object.entries(dayData).map(([timeKey, place], index) => (
//                   <div key={index} className="bg-slate-700 rounded-2xl overflow-hidden shadow-lg">
//                     <img
//                       src={placeImages[place.placeName] || place.placeImageUrl || `https://source.unsplash.com/400x300/?${encodeURIComponent(place.placeName)}`}
//                       alt={place.placeName}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="p-4">
//                       <h4 className="font-semibold text-white">{place.placeName}</h4>
//                       <p className="text-slate-300 text-sm">{place.placeDetails}</p>
//                       <p className="text-slate-400 text-xs mt-1">Best time: {place.bestTimeToVisit}</p>
//                       <p className="text-slate-400 text-xs mt-1">Ticket: {place.ticketPricing}</p>
//                       <p className="text-slate-400 text-xs mt-1">Travel info: {place.timeToTravel}</p>
//                     </div>
//                   </div>
//  ))}
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default PlacestoVisit;



import React, { useState, useEffect } from 'react';

function PlacestoVisit({ trip }) {
  const [placeImages, setPlaceImages] = useState({});

  // Fetch image for a place from Unsplash
  const getPlaceImage = async (placeName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&per_page=1&client_id=J_oekI2MwO3xYLtSHPYZeZgESWwhSDATQsSU7mT1f6c`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.small;
      } else {
        return `https://source.unsplash.com/400x300/?${encodeURIComponent(placeName)}`;
      }
    } catch (error) {
      console.error("Error fetching place image:", error);
      return `https://source.unsplash.com/400x300/?${encodeURIComponent(placeName)}`;
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (!trip?.tripData?.itinerary) return;

      const images = {};
      for (const [dayKey, dayData] of Object.entries(trip.tripData.itinerary)) {
        // Only keep valid places (non-empty objects)
        for (const [timeKey, place] of Object.entries(dayData)) {
          if (place && place.placeName) {
            const img = await getPlaceImage(place.placeName);
            images[place.placeName] = img;
          }
        }
      }
      setPlaceImages(images);
    };
    fetchImages();
  }, [trip]);

  return (
    <div className="mb-8">
      <h2 className='font-bold text-2xl text-white mb-4'>Places to Visit</h2>

      <div className="space-y-6">
        {trip?.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(([dayKey, dayData], dayIndex) => {
            // Filter valid places for this day
            const places = Object.values(dayData).filter(place => place && place.placeName);
            if (places.length === 0) return null; // Skip day if no places

            return (
              <div key={dayKey} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h3 className="font-bold text-xl text-emerald-400 mb-4">Day {dayIndex + 1}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {places.map((place, index) => (
                    <div key={index} className="bg-slate-700 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={placeImages[place.placeName] || place.placeImageUrl || `https://source.unsplash.com/400x300/?${encodeURIComponent(place.placeName)}`}
                        alt={place.placeName}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-white">{place.placeName}</h4>
                        <p className="text-slate-300 text-sm">{place.placeDetails}</p>
                        <p className="text-slate-400 text-xs mt-1">Best time: {place.bestTimeToVisit}</p>
                        <p className="text-slate-400 text-xs mt-1">Ticket: {place.ticketPricing}</p>
                        <p className="text-slate-400 text-xs mt-1">Travel info: {place.timeToTravel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlacestoVisit;

