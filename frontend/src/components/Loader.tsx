import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

export const Loader = () => {
  const [data, setData] = useState([]);
  const [done, setDone] = useState<boolean>(false);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((respones) => respones.json())
      .then((json) => {
        setData(json);
        setDone(true);
      });
  }, []);
  return (
    <div className=" flex justify-center items-center h-screen">
      <ReactLoading type="spin" color="black" width={38} />
    </div>
  );
};
