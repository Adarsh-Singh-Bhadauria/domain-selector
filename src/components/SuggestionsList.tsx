const SuggestionsList: React.FC<{ suggestions: string[]; onSelect: (index: number) => void; activeIndex: number; }> = ({ suggestions, onSelect, activeIndex }) => (
  <ul className="text-gray-400 border mt-2 rounded-lg shadow-lg">
      {suggestions.map((suggestion, index) => (
          <li
              key={index}
              onClick={() => onSelect(index)}
              className={`p-2 cursor-pointer ${activeIndex === index ? 'bg-blue-400 text-white' : 'hover:bg-blue-100'}`}
          >
              {suggestion}
          </li>
      ))}
  </ul>
);

export default SuggestionsList;