// 



// import React from 'react';

// function Hotels({ trip }) {
//   const getHotelImage = (hotelName, destination) => {
//     if (!hotelName) {
//       return 'https://source.unsplash.com/400x300/?hotel,luxury,room';
//     }

//     // Keep unicode characters, collapse whitespace
//     const cleanHotelName = hotelName.trim().replace(/\s+/g, ' ');
//     const cityName = destination ? destination.split(',')[0].trim() : '';

//     // Build terms, remove any accidental commas inside terms, encode each term, then join with commas
//     const terms = [cleanHotelName, 'hotel', cityName]
//       .map(t => t.trim().replace(/,/g, '')) // remove commas inside terms
//       .filter(Boolean);

//     const keywords = terms.map(t => encodeURIComponent(t)).join(',');
//     const url = `https://source.unsplash.com/400x300/?${keywords}`;

//     // Helpful debug when things don't load
//     console.debug('getHotelImage ->', { hotelName, destination, url });
//     console.log("Image URL:", url);

//     return url;
//   };

//   return (
//     <div className="mb-8">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
//           <span className="mr-3">🏨</span>
//           Hotel Recommendations
//         </h2>
//         <p className="text-slate-300 text-lg">
//           Handpicked accommodations for your perfect stay
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//         {trip?.tripData?.hotels?.map((item, i) => (
//           <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer group">
//             <div className="relative overflow-hidden">
//               <img
//                 src={getHotelImage(item?.hotelName, trip?.userSelection?.destination)}
//                 alt={item?.hotelName || 'Hotel'}
//                 loading="lazy"
//                 className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//                 onError={(e) => {
//                   // prevent infinite loop if fallback also errors
//                   e.currentTarget.onerror = null;
//                   e.currentTarget.src = 'https://source.unsplash.com/400x300/?hotel,luxury,accommodation';
//                 }}
//               />
//               <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
//                 {item?.price}/day
//               </div>
//               <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
//                 ⭐ {item?.rating}
//               </div>
//             </div>

//             <div className="p-6">
//               <h3 className="text-xl font-bold text-white mb-3 capitalize group-hover:text-emerald-400 transition-colors duration-300">
//                 {item?.hotelName}
//               </h3>
//               <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
//                 {item?.description}
//               </p>

//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">🛏️ Comfortable Rooms</span>
//                 <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">🍽️ Restaurant</span>
//                 <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">📶 Free WiFi</span>
//               </div>

//               <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {(!trip?.tripData?.hotels || trip?.tripData?.hotels?.length === 0) && (
//         <div className="text-center py-12">
//           <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
//             <span className="text-4xl">🏨</span>
//           </div>
//           <h3 className="text-xl font-semibold text-white mb-2">No Hotels Found</h3>
//           <p className="text-slate-400">Hotel recommendations will appear here once your trip is generated.</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Hotels;




//****************picsum


// import React from 'react'

// function Hotels({ trip }) {
//   // Function to get hotel image (using Picsum instead of Unsplash)
//   const getHotelImage = (hotelName, destination) => {
//     // Generate a consistent random image using a seed
//     const seed = encodeURIComponent(hotelName || destination || "hotel");
//     console.log(seed);
//     return `https://picsum.photos/seed/${seed}/400/300`;
//   };

//   return (
//     <div className="mb-8">
//       {/* Section Header */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
//           <span className="mr-3">🏨</span>
//           Hotel Recommendations
//         </h2>
//         <p className="text-slate-300 text-lg">
//           Handpicked accommodations for your perfect stay
//         </p>
//       </div>

//       {/* Hotels Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//         {trip?.tripData?.hotels?.map((item, i) => (
//           <div 
//             key={i} 
//             className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer group"
//           >
//             {/* Hotel Image */}
//             <div className="relative overflow-hidden">
//               <img 
//                 src={getHotelImage(item?.hotelName, trip?.userSelection?.destination)}
//                 alt={item?.hotelName || 'Hotel'}
//                 className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//                 onError={(e) => {
//                   e.target.src = `https://picsum.photos/400/300`;
//                 }}
//               />
//               {/* Price Badge */}
//               <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
//                 {item?.price}/day
//               </div>
//               {/* Rating Badge */}
//               <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
//                 ⭐ {item?.rating}
//               </div>
//             </div>

//             {/* Hotel Details */}
//             <div className="p-6">
//               <h3 className="text-xl font-bold text-white mb-3 capitalize group-hover:text-emerald-400 transition-colors duration-300">
//                 {item?.hotelName}
//               </h3>
              
//               <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
//                 {item?.description}
//               </p>

//               {/* Hotel Features */}
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
//                   🛏️ Comfortable Rooms
//                 </span>
//                 <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
//                   🍽️ Restaurant
//                 </span>
//                 <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
//                   📶 Free WiFi
//                 </span>
//               </div>

//               {/* Book Now Button */}
//               <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* No Hotels Message */}
//       {(!trip?.tripData?.hotels || trip?.tripData?.hotels?.length === 0) && (
//         <div className="text-center py-12">
//           <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
//             <span className="text-4xl">🏨</span>
//           </div>
//           <h3 className="text-xl font-semibold text-white mb-2">No Hotels Found</h3>
//           <p className="text-slate-400">Hotel recommendations will appear here once your trip is generated.</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Hotels









import React, { useEffect, useState } from 'react';

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});

  // Fetch hotel image from Unsplash API
  const getHotelImage = async (hotelName, destination) => {
    try {
      const query = `${hotelName || "hotel"} ${destination || ""}`;
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=J_oekI2MwO3xYLtSHPYZeZgESWwhSDATQsSU7mT1f6c`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results[0].urls.small;
      } else {
        return "https://source.unsplash.com/400x300/?hotel,luxury,room";
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      return "https://source.unsplash.com/400x300/?hotel,luxury,room";
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (trip?.tripData?.hotels) {
        const images = {};
        for (const hotel of trip.tripData.hotels) {
          const img = await getHotelImage(hotel?.hotelName, trip?.userSelection?.destination);
          images[hotel.hotelName] = img;
        }
        setHotelImages(images);
      }
    };

    fetchImages();
  }, [trip]);

  return (
    <div className="mb-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="mr-3">🏨</span> Hotel Recommendations
        </h2>
        <p className="text-slate-300 text-lg">
          Handpicked accommodations for your perfect stay
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {trip?.tripData?.hotels?.map((item, i) => (
          <div key={i} className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="relative">
              <img
                src={hotelImages[item.hotelName] || "https://source.unsplash.com/400x300/?hotel"}
                alt={item?.hotelName || "Hotel"}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {item?.price}/day
              </div>
              <div className="absolute top-4 left-4 bg-slate-900/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ {item?.rating}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">{item?.hotelName}</h3>
              <p className="text-slate-300 text-sm mb-4">{item?.description}</p>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;



