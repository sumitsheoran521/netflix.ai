import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constant';
import { addTopRatedMovies } from '../utils/moviesSlice';

const useTopRatedMovies = () => {
   // Fetch data from TMDB api and update the store
   const dispatch = useDispatch();
   const getTopRatedMovies = async () => {
     const data = await fetch(
       "https://api.themoviedb.org/3/movie/top_rated?page=1",
       API_OPTIONS
     );
     const response = await data.json();
     dispatch(addTopRatedMovies(response.results));
   };
   useEffect(() => {
    getTopRatedMovies();
   }, []);
}

export default useTopRatedMovies