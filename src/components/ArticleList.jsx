import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import FilterBar from "./FilterBar";
import { useSearchParams } from "react-router";
import { useParams } from "react-router";

const URL_BASE = "http://localhost:9090";

function ArticleList() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const { topic_name } = useParams();

  const query = {
    sort_by: searchParams.get("sort_by") || "created_at",
    order: searchParams.get("order") || "desc",
    topic: topic_name,
  };

  useEffect(() => {
    async function getData() {
      try {
        const queryString = new URLSearchParams(query).toString();
        console.log("ArticleList, getData. querstring ", queryString);
        const response = await fetch(`${URL_BASE}/api/articles?${queryString}`);

        if (!response.ok) throw new Error("Network response was not ok");

        const jsonData = await response.json();
        setData(jsonData.articles);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, [searchParams, searchParams, topic_name]);

  return (
    <>
      <h1>List of Articles</h1>
      <FilterBar />
      <ul>
        {data.map((article) => (
          <ArticleCard
            articleData={article}
            key={"articlecard" + article.article_id}
          />
        ))}
      </ul>
    </>
  );
}

export default ArticleList;
