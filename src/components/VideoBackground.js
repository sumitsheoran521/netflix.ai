import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerId = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="w-full h-screen ">
      <iframe
        className="w-full h-auto aspect-video"
        src={`https://www.youtube.com/embed/${trailerId?.key}?autoplay=1&mute=1&cc_load_policy=0&controls=0&modestbranding=1&rel=0`}
        title="YouTube video player"
        aspect-ratio = "16 / 9"
        frameBorder="0"
        allow="autoplay; encrypted-media; allowfullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
