import { useState } from "react";
import { lazy, Suspense } from "react";
import "@picocss/pico";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddForm from "./pages/AddForm";
import EditForm from "./pages/EditForm";
import NotFoundPage from "./pages/NotFoundPage";
function Loading() {
  return <p>Loading ...</p>;
}
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}></Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Add" element={<AddForm />}></Route>
          <Route path="/Edit" element={<EditForm />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
