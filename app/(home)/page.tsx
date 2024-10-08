import MovieCarousel from '../../components/movie-carousel';
import MovieOverview from '../../components/movie-overview';
import styles from '../../style/home.module.css';
import { API_URL } from '../constants';

export const metadata = {
  title: 'Home',
};

async function getMovies() {
  const response = fetch(API_URL);
  const json = (await response).json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      <MovieOverview movies={movies} />
      <MovieCarousel movies={movies} />
    </div>
  );
}
