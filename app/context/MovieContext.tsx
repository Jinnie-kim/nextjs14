'use client';

import { createContext, useContext, useState } from 'react';

// Context 생성
export const MovieContext = createContext(null);

// Provider 컴포넌트 정의
export function MovieProvider({ children }) {
  const [selectedMovieCurrentIndex, setSelectedMovieCurrentIndex] = useState('');

  return <MovieContext.Provider value={{ selectedMovieCurrentIndex, setSelectedMovieCurrentIndex }}>{children}</MovieContext.Provider>;
}

// useMovie 훅을 만들어 Context 접근을 쉽게 함
export function useMovie() {
  return useContext(MovieContext);
}
