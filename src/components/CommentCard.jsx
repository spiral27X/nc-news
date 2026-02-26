import formatDate from "../utils/dateISOtoHumanReadable";
import { UserContext } from "./UserContext";

function CommentCard({ commentData }) {
  const { body, votes, author, created_at } = commentData;
  console.log("CommentCard, commentdata:", commentData);

  return (
    <>
      <p style={{ margin: "4px 0" }}>
        {console.log(author)}
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
