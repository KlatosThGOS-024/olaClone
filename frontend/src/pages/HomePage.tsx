//       async function init() {
//         await customElements.whenDefined('gmp-map');
//         const map = document.querySelector('gmp-map');
//         const marker = document.querySelector('gmp-advanced-marker');
//         const placePicker = document.querySelector('gmpx-place-picker');
//         const infowindow = new google.maps.InfoWindow();

import { useState } from "react";
import { SearchedLocations } from "../components/SearchedLocations";

//         map.innerMap.setOptions({
//           mapTypeControl: false
//         });

//         placePicker.addEventListener('gmpx-placechange', () => {
//           const place = placePicker.value;

//           if (!place.location) {
//             window.alert(
//               "No details available for input: '" + place.name + "'"
//             );
//             infowindow.close();
//             marker.position = null;
//             return;
//           }

//           if (place.viewport) {
//             map.innerMap.fitBounds(place.viewport);
//           } else {
//             map.center = place.location;
//             map.zoom = 17;
//           }

//           marker.position = place.location;
//           infowindow.setContent(
//             `<strong>${place.displayName}</strong><br>
//              <span>${place.formattedAddress}</span>
//           `);
//           infowindow.open(map.innerMap, marker);
//         });
//       }

//       document.addEventListener('DOMContentLoaded', init);
//     </script>
//     <script type="module" src="https://unpkg.com/@googlemaps/extended-component-library@0.6">
//     </script>
//     <style>
//       html,
//       body {
//         height: 100%;
//         margin: 0;
//         padding: 0;
//       }

//       .place-picker-container {
//         padding: 20px;
//       }
//     </style>
//   </head>
//   <body>
//     <gmpx-api-loader key="AIzaSyCzDY5HEFUAMyvsvzN7jHSgddEb8eYT0TE" solution-channel="GMP_GE_mapsandplacesautocomplete_v1">
//     </gmpx-api-loader>
//     <gmp-map center="40.749933,-73.98633" zoom="13" map-id="DEMO_MAP_ID">
//       <div slot="control-block-start-inline-start" class="place-picker-container">
//         <gmpx-place-picker placeholder="Enter an address"></gmpx-place-picker>
//       </div>
//       <gmp-advanced-marker></gmp-advanced-marker>
//     </gmp-map>
//   </body>
// </html>Sjernf@!34
//
import { motion } from "framer-motion";
import ChooseYourRide from "../components/ChooseYourRide";
import ConfirmYourRide from "../components/ConfirmYourRide";

export const HomePage = () => {
  const [openPanel, setopenPanel] = useState(false);
  const [vechPanel, setvechPanel] = useState(false);
  const [myLocation, setMyLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [confirmRide, setConfirmRide] = useState(false);
  const panelOpen = () => {
    setopenPanel(!openPanel);
  };
  const openRide = () => {
    setvechPanel(!vechPanel);
  };
  const rideConfirmedFunc = () => {
    setConfirmRide(!confirmRide);
  };
  return (
    <section className=" overflow-y-hidden relative">
      {/* Background Image */}
      <div className="">
        <img src="../../public/images/map1.png" />
      </div>
      {/* First Motion where the search Destination will get hide */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: openPanel ? 500 : 0 }}
        transition={{
          duration: 0.8,
        }}
        className="absolute bottom-0 w-full bg-white px-3 py-2"
      >
        <div className=" flex gap-2">
          <div>
            <img
              className=" w-[48px]"
              src="../../public/images/call-taxi.png"
            ></img>
            <span className=" underline underline-offset-2">Daily</span>
          </div>
          <div>
            <img
              className=" w-[48px]"
              src="../../public/images/call-taxi.png"
            ></img>
            <span className=" underline underline-offset-2">Outstation</span>
          </div>
        </div>

        <div className=" shadow-lg rounded-lg py-1 px-3 h-[100%] ">
          <p>Find a trip</p>
          <div
            onClick={panelOpen}
            className="px-3 rounded-lg flex items-center bg-gray-700 "
          >
            {/* search icon */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              className=" w-[28px] fill-[#40C057]"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>

            <input
              className=" mx-4 bg-gray-700 w-full outline-none placeholder:text-black placeholder:text-[20px] placeholder:font-semibold"
              placeholder="Search Destination"
            ></input>
          </div>
          <SearchedLocations />
        </div>
      </motion.div>
      {/* Second Motion where the search Destination and address comes from above */}
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: openPanel && !vechPanel ? 0 : -100,

          height: openPanel && !vechPanel ? "20%" : "0%",
        }}
        transition={{
          duration: 0.8,
        }}
        className={`${
          !openPanel ? "hidden" : "absolute"
        } bg-white w-full absolute px-[38px] top-0`}
      >
        <div className=" py-3 px-2">
          <div className=" flex gap-3 items-center ">
            <img
              onClick={panelOpen}
              className=" cursor-pointer w-[28px]"
              src="../../public/images/left-arrow.png"
            ></img>
            <p className=" text-black font-serif font-semibold">Pick-up</p>
          </div>
        </div>
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: openPanel && !vechPanel ? 0 : -100,
          }}
          transition={{
            duration: 0.8,
          }}
          className="bg-[#eee] rounded-lg p-2 "
        >
          <div className=" flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <input
              onChange={(e: any) => setMyLocation(e.target.value)}
              className="w-full bg-[#eee] px-[18px] py-[13px] outline-none  "
              placeholder="Search for an address or landmark"
            ></input>
          </div>
          <div className=" flex items-center">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <input
              onChange={(e: any) => setDestinationLocation(e.target.value)}
              className="w-full bg-[#eee]  px-[18px] py-[13px] outline-none  "
              placeholder="Enter Destination"
            ></input>
            <button
              onClick={() => console.log(myLocation, destinationLocation)}
            >
              Click me
            </button>
          </div>
        </motion.div>
      </motion.div>
      {/* Third Motion where the history of search location comes from bottom*/}
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: openPanel && !vechPanel ? 0 : 100,
          height: openPanel && !vechPanel ? "80%" : "0%",
        }}
        transition={{
          duration: 0.8,
        }}
        className={`${!openPanel ? "hidden" : "absolute"}
        bg-white w-full bottom-0`}
      >
        <div className=" px-[18px]">
          <SearchedLocations />
        </div>

        <button
          onClick={openRide}
          className=" absolute bottom-0 left-[148px] mt-[36px] bg-green-700 px-[22px] py-3
             text-white rounded-xl w-fit h-fit
      text-[18px] font-[600]"
        >
          look For ride
        </button>
      </motion.div>
      {/* Choose your ride */}
      <motion.div
        className={`${!vechPanel ? "hidden" : ""} `}
        initial={{ y: 0 }}
        animate={{ y: vechPanel ? 0 : 600 }}
        transition={{
          duration: 0.8,
        }}
      >
        <ChooseYourRide
          panelClose={setopenPanel}
          closeRide={setvechPanel}
          rideConfirmedFun={rideConfirmedFunc}
        />
      </motion.div>

      <motion.div
        className={`${!confirmRide ? "hidden" : ""} `}
        initial={{ y: 0 }}
        animate={{ y: confirmRide ? 0 : 300 }}
        transition={{
          duration: 0.6,
        }}
      >
        <ConfirmYourRide backHome={rideConfirmedFunc} />
      </motion.div>
    </section>
  );
};
{
  /* <div className="line absolute top-[5.5rem] left-[3.2rem] h-[2.9rem] w-[2px] bg-black"></div> */
}
