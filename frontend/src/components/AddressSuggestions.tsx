export const AddressSuggestions = ({
  onSelectSuggestion,
  suggestions,
  setInput,
  classAttribute,
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  classAttribute: string;
  onSelectSuggestion: any;
  suggestions: string[];
}) => {
  const isSuggestionsEmpty = suggestions.length === 1 && suggestions[0] === "";

  return (
    <div
      className={`${
        isSuggestionsEmpty ? "hidden" : ""
      } z-50 ${classAttribute} bg-gray-100 rounded-lg shadow-md max-w-md mx-auto`}
    >
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((address) => (
            <div key={address}>
              <li
                onClick={() => {
                  onSelectSuggestion(address);
                  setInput(address);
                }}
                className={`cursor-pointer hover:bg-gray-100 bg-white p-4 px-[48px] w-[364px] 
                  hover:shadow-md hover:border-gray-300 transition-all duration-200`}
              >
                {address}
              </li>
              <hr></hr>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic"></p>
        )}
      </ul>
    </div>
  );
};
