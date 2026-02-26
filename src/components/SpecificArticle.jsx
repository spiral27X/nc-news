//const URL_BASE = "https://nc-news-oi1k.onrender.com";
const URL_BASE = "http://localhost:9090";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentList from "./CommentList";
import formatDate from "../utils/dateISOtoHumanReadable";

function SpecificArticle() {
  const { article_id } = useParams();

  const [data, setData] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    async function getData() {
      //console.log(URL_BASE);

      const response = await fetch(`${URL_BASE}/api/articles/${article_id}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData.article);
      setData(jsonData.article);
      //console.log(data); //does not output, not ready yet.  Could use helper function, useEffect on data change and not proceed until it is ready
      //console.log(jsonData);
    }

    //console.log("getData ran");
    setReset(false);
    getData();
  }, [reset]);

  const {
    author,
    title,
    topic,
    created_at,
    body,
    votes,
    article_img_url,
    comment_count,
  } = data;

  //console.log(data);

  return (
    <>
      <article>
        <header>
          <img
            src={article_img_url}
            alt={article_img_url}
            style={{ width: "200px" }}
          />

          <h2 style={{ margin: "0 0 8px 0" }}>{title}</h2>
          <p style={{ margin: "4px 0" }}>
            By <strong>{author}</strong>
          </p>
        </header>

        <p style={{ margin: "4px 0" }}>
          <strong>Topic:</strong> {topic}
        </p>

        <p style={{ margin: "4px 0", fontSize: "14px" }}>
          <strong>Published:</strong> <time>{formatDate(created_at)} </time>
        </p>

        <p>{body}</p>

        <footer style={{ marginTop: "6px" }}>
          <span>
            <span>
              <strong>Votes:</strong> {votes}
            </span>
            <p>
              This Article has <strong>{comment_count}</strong> Comments:
            </p>
          </span>
        </footer>
        {/*<div>{Math.random()}</div>*/}
      </article>

      <CommentList article_id={article_id} />
    </>
  );
}

export default SpecificArticle;
