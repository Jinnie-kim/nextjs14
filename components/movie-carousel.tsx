'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../style/movie-carousel.module.css';
import Movie from './movie';

export default function MovieCarousel({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLUListElement>(null);
  const [maxIndex, setMaxIndex] = useState(0);

  // useEffect로 maxIndex 계산
  useEffect(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.parentElement?.clientWidth ?? 800; // 부모 컨테이너 너비
      const itemWidth = 120 + 10; // 슬라이드 너비 + 간격
      const visibleSlides = Math.floor(containerWidth / itemWidth);
      setMaxIndex(movies.length - visibleSlides); // 이동 가능한 최대 인덱스 설정
    }
  }, [movies.length]);

  // 다음 슬라이드로 이동
  const handleNext = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;

        // 첫 번째 슬라이드에서 더 뒤로 이동하지 않도록 처리
        if (newIndex < 0) {
          return 0;
        }

        return newIndex;
      });
    }
  };

  return (
    <div className={styles['carousel-container']}>
      <button
        className={`${styles['carousel-button']} ${styles.left}`}
        onClick={handlePrev}
        disabled={currentIndex === 0} // 첫 번째 슬라이드일 때 비활성화
      >
        &lt;
      </button>
      <ul
        ref={carouselRef}
        className={styles['carousel-inner']}
        style={{
          transform: `translateX(-${Math.min(currentIndex, maxIndex) * (120 + 10)}px)`,
        }}
      >
        {movies.map((movie, index) => (
          <li key={index} className={`${styles['carousel-item']} ${currentIndex === index ? styles.selected : ''}`}>
            <Movie title={movie.title} id={movie.id} poster_path={movie.poster_path} />
          </li>
        ))}
      </ul>
      <button
        className={`${styles['carousel-button']} ${styles.right}`}
        onClick={handleNext}
        disabled={currentIndex >= movies.length - 1} // 마지막 슬라이드일 때 비활성화
      >
        &gt;
      </button>
    </div>
  );
}
