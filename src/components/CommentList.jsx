//const URL_BASE = "https://nc-news-oi1k.onrender.com";
const URL_BASE = "http://localhost:9090";

import { useState, useEffect } from "react";

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
      //setData(jsonData.article);
    }

    getData();
  }, []);

  return (
    <>
      <div>Where are comment list goes</div>
      <p>{data}</p>
      {/*<p>{JSON.stringify(data)}</p>*/}
    </>
  );
}

export default CommentList;
