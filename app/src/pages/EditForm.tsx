import { Link } from "react-router-dom";

function EditForm() {
  return (
    <>
      <div>
        <h1>Edit Movies</h1>
      </div>
      <form>
        <label htmlFor="edit-title">Movie Title</label>
        <input
          type="text"
          name="edit-title"
          id="edit-title"
          placeholder="Enter the movie title"
          required
        ></input>
        <label htmlFor="edit-year">Release Year</label>
        <input
          type="number"
          name="edit-year"
          id="edit-year"
          placeholder="Enter the movie Release Year"
          required
        ></input>
        <div className="grid">
          <button className="secondary outline">
            <Link to="/">Save Changes</Link>
          </button>

          <button className="secondary outline">
            <Link to="/">Cancel</Link>
          </button>
        </div>
      </form>
    </>
  );
}
export default EditForm;
