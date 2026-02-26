//const URL_BASE = "https://nc-news-oi1k.onrender.com";
const URL_BASE = "http://localhost:9090";

import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import AddComment from "./AddComments";
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
      setData(jsonData.comments);
      //console.log(jsonData.comments);
    }

    getData();
  }, []);

  return (
    <>
      <AddComment article_id={article_id} setCommentData={setData} />
      <h1>List of Comments</h1>

      <ul>
        {data.map((comment) => (
          <CommentCard
            commentData={comment}
            key={"commentcard" + comment.comment_id}
          ></CommentCard>
        ))}
      </ul>
    </>
  );
}

export default CommentList;
