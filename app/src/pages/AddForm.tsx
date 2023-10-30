import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { addMovie } from "../services/api";
import React, { useState } from "react";
import Loading from "../components/Loading/LoadingIcon";
import { IMovieAdd, IShowError } from "../Interfaces/Interface";
import Form from "../components/Form";
import LoadingIcon from "../components/Loading/LoadingIcon";
const AddForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  //const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  async function handleAddfromForm(movie: IMovieAdd) {
    try {
      const moviePayload = {
        id: movie.id,
        title: movie.title,
        year: movie.year,
      };
      setIsLoading(true);
      {
        isLoading ? <LoadingIcon /> : <></>;
      }
      toggleModal();
      const response = await addMovie(moviePayload);
      if (response) {
        setShowModalMsg({
          action: "Success",
          msg: "Added",
        });
        console.log(response);
      }

      //navigate("/");
    } catch (error) {
      console.log("Errored", error);
      if (error instanceof Error) {
        setShowModalMsg({
          action: "failed",
          msg: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Layout title="AddForm">
        <div className="container">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div>
                <h1>Add New Movies</h1>
              </div>

              <Form
                type="add"
                addingMovie={(movie) => handleAddfromForm(movie)}
              />

              {showModal && (
                <Modal errorMsg={showModalMsg} closeModal={toggleModal} />
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};
export default AddForm;
