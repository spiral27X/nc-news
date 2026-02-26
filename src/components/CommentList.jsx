//const URL_BASE = "https://nc-news-oi1k.onrender.com";
const URL_BASE = "http://localhost:9090";

import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

function CommentList({ article_id }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${URL_BASE}/api/articles/${article_id}/comments`,
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log("The commment response: ", jsonData);
      setData(jsonData.comments);
    }

    getData();
  }, []);

  return (
    <>
      <h1>List of Comments</h1>

      <ul>
        {data.map((comment) => (
          <CommentCard
            commentData={comment}
            key={"commentcard" + comment.comment_id}
          ></CommentCard>
        ))}
        <p>{console.log(`From CommentList data: ${data}`)}</p>
      </ul>
    </>
  );
}

export default CommentList;
