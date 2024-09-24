export const metadata = {
  title: 'Home',
};

const URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

async function getMovies() {
  return fetch(URL).then((response) => response.json());
}

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div>
      <h1>{JSON.stringify(movies)}</h1>
    </div>
  );
}
