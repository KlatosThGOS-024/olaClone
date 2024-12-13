import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ConfirmYourRide from "./ConfirmYourRide";
import NearbyDriver from "./NearbyDriver";

const RideComponent = () => {
  const [driverPanel, setDriverPanel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDriverPanel(true);
    }, 3000);

    // Cleanup the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: driverPanel ? 900 : 0 }}
        transition={{
          duration: 0.8,
        }}
      >
        <ConfirmYourRide />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: !driverPanel ? 900 : 0 }}
        transition={{
          duration: 0.8,
        }}
      >
        <NearbyDriver />
      </motion.div>
    </div>
  );
};

export default RideComponent;
