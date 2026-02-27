import { useEffect, useState } from "react";
import { Link } from "react-router";
const URL_BASE = "http://localhost:9090";
function Topics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${URL_BASE}/api/topics`);
      if (!response.ok) throw new Error("Network repsonse not ok");

      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData.topics);
    }

    getData();
  }, []);
  return (
    <>
      <header>
        <h1>Choose From one of These Topic</h1>
        <ul>
          {data.map((topic, i) => (
            <li key={`topicslist${i}`}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
              <p>{topic.description} </p>
            </li>
          ))}
        </ul>
      </header>
    </>
  );
}

export default Topics;
