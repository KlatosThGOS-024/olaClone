import { CaptainDetails } from "../components/CaptainDetails";

export const CaptainHome = () => {
  return (
    <section className=" overflow-y-hidden relative">
      <img src="../../public/images/captainMap.png"></img>
      <CaptainDetails />
    </section>
  );
};
