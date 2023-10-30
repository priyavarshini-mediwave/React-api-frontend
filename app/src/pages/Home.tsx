import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Layout from "../components/Layout";
import { getMovies } from "../services/api";
import Loading from "../components/Loading";
import { deleteMovie } from "../services/api";
import { IMovieAdd, IShowError } from "../Interfaces/Interface";
import Form from "../components/Form";

// interface IMovie {
//   id: number;
//   title: string;
//   year: number;
// }
interface IHome {
  onEditAdd: (m: IMovieAdd) => void;
}
const Home: React.FC<IHome> = ({ onEditAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<IMovieAdd[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

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
    toggleModal();
    try {
      const response = await deleteMovie(id);
      console.log(response.data);
      if (response) {
        setShowModalMsg({
          action: "Succes",
          msg: "Deleted",
        });
      }
      setRefresh(true);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  function handleDatatoEdit(m: IMovieAdd) {
    console.log("ToEditMovie", m);
    onEditAdd(m);
  }

  return (
    <>
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

                  <div className="cardButtons">
                    <button
                      className="editButton"
                      onClick={() => handleDatatoEdit(m)}
                    >
                      <Link to={`/edit/:${m.id}`}>&#9999; Edit</Link>
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(m.id)}
                      disabled={isLoading}
                    >
                      🗑️ Delete
                    </button>
                    {showModal && (
                      <dialog open>
                        <article>
                          <a
                            href="#close"
                            aria-label="Close"
                            className="close"
                            data-target="modal-example"
                            onClick={toggleModal}
                          ></a>
                          <h3>{showModalMsg.action}</h3>
                          <p>{showModalMsg.msg}</p>

                          <footer>
                            <a href="/" role="button">
                              Ok
                            </a>
                          </footer>
                        </article>
                      </dialog>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};
export default Home;
