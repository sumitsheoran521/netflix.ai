import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constant';
import { addPopularMovie } from '../utils/moviesSlice';

const usePopularMovies = () => {
   // Fetch data from TMDB api and update the store
   const dispatch = useDispatch();
   const getPopularMovies = async () => {
     const data = await fetch(
       "https://api.themoviedb.org/3/movie/popular?page=1",
       API_OPTIONS
     );
     const response = await data.json();
     dispatch(addPopularMovie(response.results));
   };
   useEffect(() => {
    getPopularMovies();
   }, []);
}

export default usePopularMovies