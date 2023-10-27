import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Layout from "../components/Layout";
import { getMovies } from "../services/api";
import Loading from "../components/Loading";
import { deleteMovie } from "../services/api";
import { IMovieAdd } from "../Interfaces/Interface";
interface IMovie {
  id: number;
  title: string;
  year: number;
}
interface IHome {
  onEditAdd: (m: IMovieAdd) => void;
}
const Home: React.FC<IHome> = ({ onEditAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    console.log("Called once");

    async function getMoviesFromAPI() {
      setIsLoading(true);
      try {
        const response = await getMovies();
        console.log(response.data);
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesFromAPI();
  }, [refresh]);

  async function handleDelete(id: number) {
    setIsLoading(true);
    console.log("deleteid", id);
    try {
      const response = await deleteMovie(id);
      console.log(response.data);
      if (response) {
        setRefresh(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  function handleDatatoEdit(m: IMovieAdd) {
    console.log("ToEditMovie", m);
    onEditAdd(m);
  }

  return (
    <Layout title="Home">
      <div className="container">
        <div className="Home">
          <h1>Your Movies List</h1>
        </div>
        <Link to="/Add" role="button" className="Add-Button">
          +
        </Link>
        <button
          disabled={isLoading}
          onClick={() => setRefresh((prev) => !prev)}
        >
          Refresh
        </button>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid">
            {movies.map((m) => (
              <article key={m.id}>
                <h1 className="movie-title">{m.title}</h1>
                <label>
                  Release Year:
                  <span>
                    <strong>{m.year}</strong>
                  </span>
                </label>

                <div className="grid">
                  <button onClick={() => handleDatatoEdit(m)}>
                    <Link to={`/edit/:${m.id}`}>&#9999;</Link>
                  </button>
                  <button
                    role="button"
                    onClick={() => handleDelete(m.id)}
                    disabled={isLoading}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Home;
