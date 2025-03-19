import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BANNER } from "../utils/constant";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src={BANNER} alt="banner" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
