import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import NearbyDriver from "./NearbyDriver";

const RideComponent = () => {
  const [driverPanel, setDriverPanel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDriverPanel(true);
    }, 3000);

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
      ></motion.div>
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
