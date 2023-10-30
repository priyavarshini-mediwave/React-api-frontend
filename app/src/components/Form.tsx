import { IMovieAdd } from "../Interfaces/Interface";
import { useState } from "react";
import { Link } from "react-router-dom";
interface IForm {
  type: string;
  addingMovie?: (m: IMovieAdd) => void;
  movieToEdit?: IMovieAdd;
}
const Form: React.FC<IForm> = ({ type, addingMovie, movieToEdit }) => {
  const [movie, setMovie] = useState<IMovieAdd>(
    movieToEdit || {
      id: 0,
      title: "",
      year: undefined,
    }
  );
  // console.log("movieFrom:", movieToEdit);
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  }
  console.log("Say Movie:", movie);
  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (addingMovie) {
      addingMovie(movie);
    }
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleAdd(e)}>
        <label htmlFor="title">Movie Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={movie.title}
          placeholder="Enter the movie title"
          required
          onChange={(e) => handleInputChange(e)}
        ></input>
        <label htmlFor="year">Release Year</label>
        <input
          type="number"
          name="year"
          id="year"
          value={movie.year?.toString() || ""}
          placeholder="Enter the movie Release Year"
          required
          onChange={(e) => handleInputChange(e)}
        ></input>

        {type === "edit" ? (
          <>
            <div className="form-input Edit-buttons">
              <button type="submit" className="form-btn">
                Update
              </button>
              <Link to="/" role="button" className="form-btn">
                Cancel
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="form-input home-buttons">
              <button type="submit" className="form-btn">
                Add movie
              </button>
              <Link to="/" role="button" className="form-btn">
                Back
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
