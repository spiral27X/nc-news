//const URL_BASE = "https://nc-news-oi1k.onrender.com";
const URL_BASE = "http://localhost:9090";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const [data, setData] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    async function getData() {
      console.log(URL_BASE);

      const response = await fetch(`${URL_BASE}/api/articles`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setData(jsonData.articles);
      //console.log(data); //does not output, not ready yet.  Could use helper function, useEffect on data change and not proceed until it is ready
      //console.log(jsonData);
    }

    //console.log("getData ran");
    setReset(false);
    getData();
  }, [reset]);

  return (
    <>
      <h1>List of Articles</h1>

      <button
        onClick={() => {
          setReset(true);
        }}
      >
        Refresh Articles
      </button>
      <ul>
        {data.map((article) => (
          <ArticleCard
            articleData={article}
            key={"articlecard" + article.article_id}
          ></ArticleCard>
        ))}
      </ul>
    </>
  );
}

export default ArticleList;
