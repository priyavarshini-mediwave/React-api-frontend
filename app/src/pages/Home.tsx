import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Layout from "../components/Layout";
import { getMovies } from "../services/api";
import Loading from "../components/Loading";
import { deleteMovie } from "../services/api";
interface IMovie {
  id: number;
  title: string;
  year: number;
}
function Home() {
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

  return (
    <Layout title="Home">
      <div className="container">
        <div className="Home">Home</div>
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
                <h1>{m.title}</h1>
                <h1>{m.year}</h1>

                <div className="grid">
                  <Link role="button" to={`/edit/${m.id}`}>
                    &#9999;
                  </Link>
                  <button role="button" onClick={() => handleDelete(m.id)}>
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
}
export default Home;
