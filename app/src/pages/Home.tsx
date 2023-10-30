import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Layout from "../components/Layout";
import { getMovies } from "../services/api";
import LoadingIcon from "../components/Loading/LoadingIcon";
import { deleteMovie } from "../services/api";
import { IMovieAdd, IShowError } from "../Interfaces/Interface";
import Modal from "../components/Modal";

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
  const bringback = () => {
    setShowModal(false);
  };
  useEffect(() => {
    console.log("Called once");

    async function getMoviesFromAPI() {
      setIsLoading(true);

      try {
        const response = await getMovies();
        console.log(response.data);
        if (response) {
          setMovies(response.data);
        }
      } catch (error) {
        console.log(error);

        if (error instanceof Error) {
          toggleModal();
          setShowModalMsg({
            action: "Failed",
            msg: error.message,
          });
        }
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
          action: "Success",
          msg: "Deleted",
        });
      }
      setRefresh((prev) => !prev);
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
            {isLoading ? <LoadingIcon /> : <></>}
            Refresh
          </button>
          {isLoading ? (
            <>
              <p>Loading Movies</p>
              <LoadingIcon />
            </>
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
                      disabled={isLoading}
                      onClick={() => handleDelete(m.id)}
                    >
                      {isLoading ? <LoadingIcon /> : <></>}
                      🗑️ Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Layout>
      {showModal && (
        <Modal
          errorMsg={showModalMsg}
          closeModal={toggleModal}
          navigateToHome={bringback}
        />
      )}
    </>
  );
};
export default Home;
