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
        const editData = data.slice(0, 5);
        setMovieStarring(editData);
      } catch (error) {
        console.error(`Failed to fetch movie `, error);
      }
    }
    async function fetchMovieVideos() {
      try {
        const res = await fetch(`${API_URL}/${currentMovie?.id}/videos`);
        const data = await res.json();
        setMovieVideos(data.slice(0, 5));
      } catch (error) {
        console.error(`Failed to fetch movie `, error);
      }
    }
    fetchMovieDetail();
    fetchMovieStarring();
    fetchMovieVideos();
  }, [selectedMovieCurrentIndex]);
  console.log(movieDetail);

  return (
    // Movie overview background image
    <div className={styles.overviewBackgroundImage} style={{ backgroundImage: `url(${currentMovie?.backdrop_path})` }}>
      {/* movie overview - left part */}
      <div className={styles.overviewLeft}>
        <h1>{movieDetail?.title}</h1>

        <div className={styles.overviewLeftInfo}>
          <span>{movieDetail?.release_date.slice(0, 4)} |</span>
          <ul>
            {movieDetail?.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>

        <p>{movieDetail?.overview}</p>

        <div>
          <h2>Starring</h2>
          <ul className={styles.overviewStarringList}>
            {movieStarring?.map((charcter) => (
              <li key={charcter.cast_id}>
                {/* <span>{charcter.original_name}</span> */}
                <img src={charcter.profile_path} alt={charcter.original_name} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button>Play Now</button>
          <button>+ My WishList</button>
        </div>
      </div>

      {/* movie overview - right part */}
      <div className={styles.overviewRight}>
        <ul className={styles.movieVideoLists}>
          {movieVideos?.map((movieVideo) => (
            <li key={movieVideo.id}>
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
  );
}
