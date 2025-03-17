import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";

const VideoBackground = () => {
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/696506/videos?language=en-US",
      API_OPTIONS
    );
    const response = await data.json();
    console.log(response);

    const filterData = response.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterData[0];
    console.log(trailer);
  };
  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default VideoBackground;
