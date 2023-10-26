import { lazy, Suspense } from "react";
import "@picocss/pico";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
// import AddForm from "./pages/AddForm";
const AddForm = lazy(() => import("./pages/AddForm"));
const EditForm = lazy(() => import("./pages/EditForm"));
import NotFoundPage from "./pages/NotFoundPage";

function Loading() {
  return <p>Loading ...</p>;
}
// function onAdd(data: IMovieAdd) {
//   console.log(data);

// }
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Add" element={<AddForm />}></Route>
            <Route path="/Edit/:id" element={<EditForm />}></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
