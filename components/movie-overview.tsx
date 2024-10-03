'use client';

import { useEffect, useState } from 'react';
import { useMovie } from '../app/context/MovieContext';
import styles from '../style/movie-overview.module.css';
import { API_URL } from '../app/constants';

export default function MovieOverview({ movies }) {
  const { selectedMovieCurrentIndex } = useMovie();
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieStarring, setMovieStarring] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);
  const currentMovie = movies[selectedMovieCurrentIndex];

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        const res = await fetch(`${API_URL}/${currentMovie?.id}`);
        const data = await res.json();

        setMovieDetail(data);
      } catch (error) {
        console.error(`Failed to fetch movie `, error);
      }
    }
    async function fetchMovieStarring() {
      try {
        const res = await fetch(`${API_URL}/${currentMovie?.id}/credits`);
        const data = await res.json();

        setMovieStarring(data);
      } catch (error) {
        console.error(`Failed to fetch movie `, error);
      }
    }
    async function fetchMovieVideos() {
      try {
        const res = await fetch(`${API_URL}/${currentMovie?.id}/videos`);
        const data = await res.json();
        setMovieVideos(data.slice(0, 10));
      } catch (error) {
        console.error(`Failed to fetch movie `, error);
      }
    }
    fetchMovieDetail();
    fetchMovieStarring();
    fetchMovieVideos();
  }, [selectedMovieCurrentIndex]);

  console.log('movieDetail::::', movieDetail);
  console.log('movieStarring:::', movieStarring);

  return (
    <div className={styles.overviewBackgroundImage} style={{ backgroundImage: `url(${currentMovie?.backdrop_path})` }}>
      <div className={styles.overviewContainer}>
        {/* movie overview - left part */}
        <div>
          <h1>{movieDetail?.title}</h1>
          <ul>
            <li>{movieDetail?.release_date}</li>•
            <li>
              {movieDetail?.genres.map((genre) => (
                <span key={genre.id}>{genre.name} |</span>
              ))}
            </li>
          </ul>
          <p>{movieDetail?.overview}</p>

          <h2>STARRING: </h2>
          <ul>
            {movieStarring?.map((charcter) => (
              <li>
                <img src={charcter.profile_path} alt={charcter.original_name} />
              </li>
            ))}
          </ul>
          <div>
            <button>Play Now</button>
            <button>+My Wishlist</button>
          </div>
        </div>
        {/* video list - right part */}
        <div>
          <ul>
            {movieVideos?.map((movieVideo) => (
              <li>
                <iframe
                  key={movieVideo.id}
                  src={`https://youtube.com/embed/${movieVideo.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={movieVideo.name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
