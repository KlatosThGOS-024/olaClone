import { useState } from "react";

import { CaptainDetails } from "../components/CaptainDetails";
import { MenuBar } from "../components/MenuBar";
import { socket } from "../App";

export const CaptainHomePage = () => {
  const [menuPanel, setMenuPanel] = useState(false);
  const [closedUserDetailPanel, setClosedUserDetailPanel] = useState(false);
  const [notifications, setNotifications] = useState(0);
  socket.on("ride-requested", () => {
    setNotifications((notifications: number) => {
      return (notifications += 1);
    });
    console.log(notifications);
  });
  const openMenu = () => {
    setMenuPanel(!menuPanel);
  };
  const openUserDetails = () => {
    setClosedUserDetailPanel(!closedUserDetailPanel);
  };
  return (
    <section className=" w-full">
      <div
        className="bg-black w-[440px] my-[28px] mx-auto
      overflow-y-hidden "
      >
        <div className="relative">
          {" "}
          <img
            className="w-full"
            src="/images/captainMap.png"
            alt="Captain Map"
          />
          <img
            onClick={openMenu}
            className=" cursor-pointer w-[28px] absolute top-[28px] left-[28px]"
            src="/images/menu.png "
          ></img>
          <p className="rounded-full absolute top-0 right-0 my-[18px] ">
            <img
              onClick={() => openUserDetails()}
              className=" cursor-pointer w-[64px]"
              src="/images/userImg-removebg-preview.png"
            ></img>
          </p>
          <MenuBar openMenu={openMenu} isOpen={menuPanel} />
          <CaptainDetails
            openUserDetails={openUserDetails}
            closedUserDetailPanel={closedUserDetailPanel}
          />
        </div>
      </div>
    </section>
  );
};
