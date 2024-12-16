const searchLocations = ["f"];
export const SearchedLocations = ({}) => {
  return (
    <section className="w-fit">
      <div className="bg-white text-black flex mx-3 space-x-2 py-[18px] mt-[18px]">
        <img
          className="w-[22px] fill-gray-500"
          src="/images/history-clock-button.png"
          alt="History"
        />
        {searchLocations.length > 0 ? (
          searchLocations.map((value: string, index: number) => (
            <div key={index}>
              <p>{value}</p>
            </div>
          ))
        ) : (
          <p>No locations found</p>
        )}
      </div>
    </section>
  );
};
