function AddForm() {
  return (
    <>
      <div>
        <h1>Add New Movies</h1>
      </div>
      <form>
        <label htmlFor="title">Movie Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter the movie title"
          required
        ></input>
        <label htmlFor="year">Release Year</label>
        <input
          type="number"
          name="year"
          id="year"
          placeholder="Enter the movie Release Year"
          required
        ></input>
        <input
          type="text"
          readOnly
          role="button"
          value="Submit"
          style={{ display: "inline" }}
        ></input>
      </form>
    </>
  );
}
export default AddForm;
