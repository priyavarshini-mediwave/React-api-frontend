import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Go back to home?</Link>
    </>
  );
};

export default NotFoundPage;
