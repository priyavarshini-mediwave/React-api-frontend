import { lazy, Suspense, useState } from "react";
import "@picocss/pico";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { IMovieAdd } from "./Interfaces/Interface";

import Home from "./pages/Home";

const AddForm = lazy(() => import("./pages/AddForm"));
const EditForm = lazy(() => import("./pages/EditForm"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function Loading() {
  return <p>Loading ...</p>;
}

function App() {
  const [data, setdata] = useState<IMovieAdd>({
    id: 0,
    title: "",
    year: 0,
  });
  function onAddtoApp(data: IMovieAdd) {
    console.log(data);
    setdata(data);
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home onEditAdd={onAddtoApp} />}></Route>
            <Route path="/Add" element={<AddForm />}></Route>
            <Route
              path="/Edit/:id"
              element={<EditForm movietoEdit={data} />}
            ></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
