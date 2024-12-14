import { useState } from "react";

import { CaptainDetails } from "../components/CaptainDetails";
import { MenuBar } from "../components/MenuBar";
import { motion } from "framer-motion";

export const CaptainHome = () => {
  const [menuPanel, setMenuPanel] = useState(false);
  const [closedUserDetailPanel, setClosedUserDetailPanel] = useState(false);

  const openMenu = () => {
    setMenuPanel(!menuPanel);
  };
  const openUserDetails = () => {
    setClosedUserDetailPanel(!closedUserDetailPanel);
  };
  return (
    <section className="overflow-y-hidden relative">
      <img src="../../public/images/captainMap.png" alt="Captain Map" />
      <img
        onClick={openMenu}
        className=" cursor-pointer w-[28px] absolute top-[28px] left-[28px]"
        src="../../public/images/menu.png "
      ></img>
      <p className=" rounded-full absolute top-0 right-0 my-[18px] ">
        <img
          onClick={() => openUserDetails()}
          className=" cursor-pointer w-[64px]"
          src="../../public/images/userImg-removebg-preview.png"
        ></img>
      </p>
      <MenuBar openMenu={openMenu} isOpen={menuPanel} />
      <CaptainDetails
        openUserDetails={openUserDetails}
        closedUserDetailPanel={closedUserDetailPanel}
      />
    </section>
  );
};
