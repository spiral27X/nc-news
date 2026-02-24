import { Link } from "react-router-dom";
import formatDate from "../utils/dateISOtoHumanReadable";

function ArticleCard({ articleData }) {
  const {
    author,
    title,
    topic,
    created_at,
    article_id,
    votes,
    article_img_url,
    comment_count,
  } = articleData;

  return (
    <article>
      <header>
        <img
          src={article_img_url}
          alt={article_img_url}
          style={{ width: "80px" }}
        />
        <Link to={`/article/${article_id}`}>Click to view article</Link>
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

      <footer style={{ marginTop: "6px" }}>
        <span>
          <strong>Comments:</strong> {comment_count}
        </span>{" "}
        |{" "}
        <span>
          <strong>Votes:</strong> {votes}
        </span>
      </footer>
      {/*<div>{Math.random()}</div>*/}
    </article>
  );
}

export default ArticleCard;
