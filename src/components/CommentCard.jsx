const URL_BASE = "http://localhost:9090";
import { useContext, useState } from "react";
import formatDate from "../utils/dateISOtoHumanReadable";
import { UserContext } from "./UserContext";

function CommentCard({ commentData }) {
  const { article_id, body, votes, author, created_at } = commentData;
  const [votesDisply, setVotesDisplay] = useState(votes);

  let change;

  return (
    <>
      <p style={{ margin: "4px 0" }}>
        User: <strong>{author}</strong>
      </p>
      <p style={{ margin: "4px 0", fontSize: "14px" }}>
        <strong>Posted :</strong> <time>{formatDate(created_at)} </time>
      </p>
      <p>{body}</p>

      <p>
        <strong>Votes: </strong>
        {votes}
      </p>
    </>
  );
}

export default CommentCard;
