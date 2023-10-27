import Layout from "../components/Layout";

import { addMovie } from "../services/api";
import React, { useState } from "react";
import Loading from "../components/Loading";
import { IShowError } from "../Interfaces/Interface";

const AddForm: React.FC = () => {
  const [data, setData] = useState({
    id: new Date().getTime(),
    title: "",
    year: 0,
  });
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
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const moviePayload = {
        id: data.id,
        title: data.title,
        year: data.year,
      };
      setIsLoading(true);
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
    <Layout title="AddForm">
      <div className="container">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div>
              <h1>Add New Movies</h1>
            </div>
            <form onSubmit={(e) => handleAdd(e)}>
              <label htmlFor="title">Movie Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter the movie title"
                required
                onChange={(e) => handleInputChange(e)}
              ></input>
              <label htmlFor="year">Release Year</label>
              <input
                type="number"
                name="year"
                id="year"
                placeholder="Enter the movie Release Year"
                required
                onChange={(e) => handleInputChange(e)}
              ></input>
              <input type="submit" value="Submit" disabled={isLoading}></input>
            </form>
            {showModal && (
              <dialog open>
                <article>
                  <a
                    href="/"
                    aria-label="Close"
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
      </div>
    </Layout>
  );
};
export default AddForm;
