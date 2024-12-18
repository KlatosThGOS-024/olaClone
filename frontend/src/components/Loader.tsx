import { motion } from "framer-motion";
const loaderVariants = {
  animationOne: {
    rotate: [0, 180], // Rotates from 0 to 180 degrees
    x: [0, 50], // The movement along the x-axis (half the circle)
    y: [0, -50], // The movement along the y-axis (half the circle)
    transition: {
      rotate: {
        repeat: Infinity,
        yoyo: true,
        duration: 2,
      },
      x: {
        repeat: Infinity,
        yoyo: true,
        duration: 2,
      },
      y: {
        repeat: Infinity,
        yoyo: true,
        duration: 2,
      },
    },
  },
};

export const Loader = () => {
  return (
    <>
      {" "}
      <motion.div
        style={{
          width: "10px",
          height: "10px",
          margin: "50px auto",
          borderRadius: "50%",
          background: "black",
        }}
        variants={loaderVariants}
        animate="animationOne"
      ></motion.div>
    </>
  );
};
