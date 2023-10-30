import Layout from "../components/Layout";
import { IMovieAdd, IShowError } from "../Interfaces/Interface";
import { useState } from "react";
import { updateMovie } from "../services/api";
import Form from "../components/Form";
import Loading from "../components/Loading";

interface IEditform {
  movie: IMovieAdd;
}
const EditForm: React.FC<IEditform> = ({ movie }) => {
  console.log("movie to edit:", movie);

  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  async function handleEditfromFrom(movie: IMovieAdd) {
    try {
      const moviePayload = {
        id: movie.id,
        title: movie.title,
        year: movie.year,
      };
      toggleModal();
      console.log("EditPayload", moviePayload);
      setIsLoading(true);
      const response = await updateMovie(moviePayload, movie.id);
      console.log(response);
      if (response) {
        setShowModalMsg({
          action: "Success",
          msg: "Updated",
        });
        console.log(response);
        //navigate("/");
      }
    } catch (error) {
      console.log("Errored");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Layout title={`Editing: ${movie.title}`}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Form
              type="edit"
              addingMovie={(movie) => handleEditfromFrom(movie)}
              movieToEdit={movie}
            />
            {showModal && (
              <dialog open>
                <article>
                  <a
                    href="#close"
                    aria-label="close"
                    className="close"
                    data-target="modal-example"
                    onClick={toggleModal}
                  ></a>

                  <h3>{showModalMsg.action}</h3>
                  <p>{showModalMsg.msg}</p>

                  <footer>
                    <a href="/" role="button">
                      Confirm
                    </a>
                  </footer>
                </article>
              </dialog>
            )}
          </>
        )}
      </Layout>
    </>
  );
};
export default EditForm;
