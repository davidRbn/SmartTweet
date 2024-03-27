import React, { useState } from "react";

type TweetType =
  | "Humorous"
  | "Aggressive"
  | "Informative"
  | "Promotional"
  | "Serious"
  | "Educational"
  | "Inspiring"
  | "Controversial";

const SectionTypePost: React.FC = () => {
  const [selectedType, setSelectedType] = useState<TweetType>("Humorous");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value as TweetType);
  };

  // Tableau des options pour la liste déroulante
  const options: TweetType[] = [
    "Humorous",
    "Aggressive",
    "Informative",
    "Promotional",
    "Serious",
    "Educational",
    "Inspiring",
    "Controversial",
  ];

  return (
    <div className="max-w-md mx-auto mt-3 mb-3">
      <label
        htmlFor="tweetType"
        className="block text-sm font-medium text-gray-700"
      >
        Type/Tone of the tweet :
      </label>
      <select
        id="tweetType"
        name="tweetType"
        className="mt-1 h-8 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedType}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SectionTypePost;
