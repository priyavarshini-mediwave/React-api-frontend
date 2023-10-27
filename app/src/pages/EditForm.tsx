import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { IMovieAdd } from "../Interfaces/Interface";
import { useState } from "react";
import { updateMovie } from "../services/api";

interface IEditform {
  movie: IMovieAdd;
}
const EditForm: React.FC<IEditform> = ({ movie }) => {
  console.log("movie to edit:", movie);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [editDatatitle, setEditDatatitle] = useState(movie.title);
  const [editDataYear, setEditDataYear] = useState(movie.year);
  // function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = e.target;
  //   setEditData({ ...editData, [name]: value });
  //   console.log(editData);
  // }

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const moviePayload = {
        id: movie.id,
        title: editDatatitle,
        year: editDataYear,
      };
      console.log("EditPayload", moviePayload);
      setIsLoading(true);
      const response = await updateMovie(moviePayload, movie.id);
      console.log(response);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log("Errored");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout title={`Editing: ${movie.title}`}>
      <div className="container">
        <div>
          <h1>Edit Movies</h1>
        </div>
        <form onSubmit={(e) => handleEditSubmit(e)}>
          <label htmlFor="edit-title">Movie Title</label>
          <input
            type="text"
            name="edit-title"
            id="edit-title"
            placeholder="Enter the movie title"
            value={editDatatitle}
            required
            onChange={(e) => setEditDatatitle(e.target.value)}
          ></input>
          <label htmlFor="edit-year">Release Year</label>
          <input
            type="number"
            name="edit-year"
            id="edit-year"
            placeholder="Enter the movie Release Year"
            required
            value={editDataYear}
            onChange={(e) => setEditDataYear(parseInt(e.target.value))}
          ></input>
          <div className="grid">
            <button className="secondary outline" disabled={isLoading}>
              SaveChanges
            </button>

            <button className="secondary outline">
              <Link to="/"></Link>Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default EditForm;
