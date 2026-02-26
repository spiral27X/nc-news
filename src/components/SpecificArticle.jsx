//const URL_BASE = "https://nc-news-oi1k.onrender.com";
const URL_BASE = "http://localhost:9090";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import CommentList from "./CommentList";
import AddComment from "./AddComments";
import formatDate from "../utils/dateISOtoHumanReadable";
import { UserContext } from "./UserContext";

function SpecificArticle() {
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      //console.log(URL_BASE);

      const response = await fetch(`${URL_BASE}/api/articles/${article_id}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();

      setData(jsonData.article);
      //console.log(data); //does not output, not ready yet.  Could use helper function, useEffect on data change and not proceed until it is ready
      //console.log(jsonData);
    }

    //console.log("getData ran");

    getData();
  }, []);

  const {
    author,
    title,
    topic,
    created_at,
    body,
    article_img_url,
    comment_count,
  } = data;

  async function handleVote(e) {
    const voteChange = e.target.id === "increase-vote" ? 1 : -1;
    setData((prev) => ({
      ...prev,
      votes: prev.votes + voteChange,
    }));
    //console.log("CommentCard handlevote, votchange:", voteChange);

    async function updateCommentVotes() {
      try {
        const response = await fetch(`${URL_BASE}/api/articles/${article_id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inc_votes: voteChange }),
        });

        if (!response.ok) {
          throw new Error("Failed to update comment");
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        setData((prev) => ({
          ...prev,
          votes: prev.votes - voteChange,
        }));
        console.error(error);
      }
    }
    updateCommentVotes();
  }

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
              <strong>Votes:</strong> {data.votes}
            </span>
            <p>
              This Article has <strong>{comment_count}</strong> Comments:
            </p>
          </span>
        </footer>
        {/*<div>{Math.random()}</div>*/}
      </article>
      {!(user === author) && (
        <>
          <button id="increase-vote" onClick={handleVote}>
            Increase Vote
          </button>
          <button id="decrease-vote" onClick={handleVote}>
            Decrease Vote
          </button>
        </>
      )}

      <CommentList article_id={article_id} />
    </>
  );
}

export default SpecificArticle;
