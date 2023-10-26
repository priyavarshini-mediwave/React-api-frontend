import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../services/api";
import React, { useState } from "react";

const AddForm: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: new Date().getTime(),
    title: "",
    year: 0,
  });

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
      const response = await addMovie(moviePayload);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log("Errored");
      console.log(error);
    }
  }

  return (
    <Layout title="AddForm">
      <div className="container">
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
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </Layout>
  );
};
export default AddForm;
