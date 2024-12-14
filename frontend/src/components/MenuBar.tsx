import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const MenuBar = ({
  isOpen,
  openMenu,
}: {
  openMenu: () => void;
  isOpen: boolean;
}) => {
  return (
    <motion.section
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 w-3/4 h-full bg-white z-50 shadow-lg"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold">Menu</h2>
        <img
          onClick={openMenu}
          className="cursor-pointer w-[28px] absolute top-[28px] left-[308px]"
          src="../../public/images/close.png"
          alt="Close menu"
        />
        <ul className="space-y-4 mt-6">
          <Link to={"/captain/cabRequests"}>
            <li>Cab Requests</li>
          </Link>
        </ul>
      </div>
    </motion.section>
  );
};
