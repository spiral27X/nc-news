const URL_BASE = "http://localhost:9090";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

function AddComment({ article_id, setCommentData }) {
  const { user } = useContext(UserContext);
  const [addCommentShow, setAddCommentShow] = useState(false);
  const [comment, setComment] = useState("");

  const maxWords = 10;
  let wordLimit;

  function handleClick() {
    setAddCommentShow(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setCommentData((prev) => [
      { user, created_at: new Date().toISOString(), votes: 0, body: comment },
      ...prev,
    ]);
    try {
      //console.log(article_id);
      const url = `${URL_BASE}/api/articles/${article_id}/comments`;
      //console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, body: comment }),
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      const data = await response.json();
      console.log(data);

      
    } catch (error) {
      setCommentData((prev) => prev.slice(1));

      console.error(error);
    }
  }
  return (
    <>
      <button onClick={handleClick} hidden={addCommentShow}>
        Add a Comment!
      </button>

      <form onSubmit={handleSubmit} hidden={!addCommentShow}>
        <label htmlFor="input-comment">
          Please Type your comment, {comment.length} characters used
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={200}
        />
        <button>Cancel</button>
        <button type="submit" hidden={!comment.length}>
          Submit
        </button>
      </form>
    </>
  );
}

export default AddComment;
