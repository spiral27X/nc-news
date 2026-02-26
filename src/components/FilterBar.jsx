import { useSearchParams } from "react-router-dom";

function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  // read both params with defaults
  const query = {
    sort_by: searchParams.get("sort_by") || "created_at",
    order: searchParams.get("order") || "desc",
  };

  // helper to update one param without wiping others
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <section>
      <div>Where FilterBar goes</div>
      <div>
        sort_by: {query.sort_by} | order: {query.order}
      </div>

      <form>
        {/* Sort By */}
        <label htmlFor="sort_by">Sort By</label>
        <select
          id="sort_by"
          value={query.sort_by}
          onChange={(e) => updateParam("sort_by", e.target.value)}
        >
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comment Number</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>

        {/* Order */}
        <label htmlFor="order">Order</label>
        <select
          id="order"
          value={query.order}
          onChange={(e) => updateParam("order", e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </form>
    </section>
  );
}

export default FilterBar;
