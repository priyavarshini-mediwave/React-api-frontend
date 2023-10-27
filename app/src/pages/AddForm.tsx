import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../services/api";
import React, { useState } from "react";
import Loading from "../components/Loading";

const AddForm: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: new Date().getTime(),
    title: "",
    year: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  //const [refresh, setRefresh] = useState(false);
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
      const response = await addMovie(moviePayload);

      console.log(response);
      navigate("/");
    } catch (error) {
      console.log("Errored");
      console.log(error);
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
              <input
                type="submit"
                value="Submit"
                disabled={isLoading}
                // onClick={() => setRefresh((prev) => !prev)}
              ></input>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};
export default AddForm;
