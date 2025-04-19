import React from 'react'

export default function Profile() {
  return (
    <div>Profile</div>
  )
}
// import React, { useEffect, useState } from 'react';

// const Profile = () => {
//   const [startup, setStartup] = useState(null);

//   useEffect(() => {
//     // Replace with real API call later (e.g., fetch('/api/startups/:id'))
//     const mockStartup = { youtube: "https://youtube.com/watch?v=example", videoFile: null, videoOption: "youtube" };
//     setStartup(mockStartup);
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Startup Profile</h1>
//       {startup?.youtube && startup.videoOption === "youtube" && (
//         <iframe
//           src={`https://www.youtube.com/embed/${startup.youtube.split("v=")[1]}`}
//           title="Pitch Video"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           className="w-full h-64 mt-4"
//         />
//       )}
//       {startup?.videoFile && startup.videoOption === "file" && (
//         <video controls className="w-full h-64 mt-4">
//           <source src={startup.videoFile} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}
//       {(!startup?.youtube && !startup?.videoFile) && (
//         <div className="mt-4">
//           <p className="text-yellow-600">No pitch video available.</p>
//           <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded" onClick={() => {/* Navigate to upload page */}}>
//             Upload Pitch Video
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;