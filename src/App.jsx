import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import SpecificArticle from "./components/SpecificArticle";
import Topics from "./components/Topics";
function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articlelist" element={<Navigate to="/" replace />} />
        <Route path="/article/:article_id" element={<SpecificArticle />} />
        <Route path="/topics" element={<Topics />} />
      </Routes>
    </>
  );
}

export default App;
