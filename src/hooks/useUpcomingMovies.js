import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constant';
import { addUpcomingMovies } from '../utils/moviesSlice';

const useUpcomingMovies = () => {
   // Fetch data from TMDB api and update the store
   const dispatch = useDispatch();
   const getUpcomingMovies = async () => {
     const data = await fetch(
       "https://api.themoviedb.org/3/movie/upcoming?page=1",
       API_OPTIONS
     );
     const response = await data.json();
     dispatch(addUpcomingMovies(response.results));
   };
   useEffect(() => {
    getUpcomingMovies();
   }, []);
}

export default useUpcomingMovies