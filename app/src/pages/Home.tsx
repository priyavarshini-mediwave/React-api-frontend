import { Link } from "react-router-dom";
import "../App.css";
import "glyphicons";
function Home() {
  return (
    <>
      <div className="Home">Home</div>
      <div>
        <article>
          <p>
            <strong>Movie:</strong>The Lion King
          </p>
          <p>
            <strong>Year:</strong>2019
          </p>
          <div className="grid">
            <button>
              <Link to="/Edit"> &#9999;</Link>
            </button>
            <button>🗑️ Delete</button>
          </div>
        </article>
      </div>
      {/* <button className="outline"> */}
      <Link to="/Add" role="button" className="Add-Button">
        +
      </Link>
      {/* </button> */}
    </>
  );
}
export default Home;
