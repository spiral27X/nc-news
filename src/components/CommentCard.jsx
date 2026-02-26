const URL_BASE = "http://localhost:9090";
import { useContext, useState } from "react";
import formatDate from "../utils/dateISOtoHumanReadable";
import { UserContext } from "./UserContext";

function CommentCard({ commentData }) {
  const { article_id, body, votes, author, created_at, comment_id } =
    commentData;
  const [votesDisply, setVotesDisplay] = useState(votes);
  const [deleteRequested, setDeleteRequested] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);
  const { user } = useContext(UserContext);

  async function verifyDeleteOnClick(e) {
    if (e.currentTarget.id === "cancel-delete") {
      setDeleteRequested(false);
      return;
    }

    try {
      console.log(comment_id);
      const response = await fetch(`${URL_BASE}/api/comments/${comment_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      setDeleteRequested(false);
      console.log(response.status);
      if (!response.ok) {
        setDeleteFailed(true);
        setDeleteRequested(false);
      }
    } catch (error) {
      console.log("caught delete");
      setDeleteFailed(true);
      setDeleteRequested(false);
    }
  }
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

      {author === user && (
        <section>
          {deleteFailed && (
            <>
              <p>Delete Operation Failed</p>
              <button
                onClick={() => {
                  setDeleteFailed(false);
                }}
              >
                OK
              </button>
            </>
          )}

          {!deleteFailed && (
            <button
              hidden={deleteRequested}
              onClick={() => setDeleteRequested(true)}
            >
              Delete Comment
            </button>
          )}

          <p hidden={!deleteRequested}>
            Confirm Request Delete?
            <button id="confirm-delete" onClick={verifyDeleteOnClick}>
              Delete
            </button>
            <button id="cancel-delete" onClick={verifyDeleteOnClick}>
              Cancel
            </button>
          </p>
        </section>
      )}
    </>
  );
}

export default CommentCard;
