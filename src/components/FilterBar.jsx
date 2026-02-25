import { useState } from "react";

function FilterBar({ query, setQuery }) {
  return (
    <section>
      <div>Where Filterbar goes</div>
      <div>
        sort_by: {query.sort_by} | order: {query.order}
      </div>

      <form>
        {/* Sort By */}
        <label htmlFor="sort_by">Sort By</label>
        <select
          id="sort_by"
          value={query.sort_by}
          onChange={(e) =>
            setQuery((prev) => ({
              ...prev,
              sort_by: e.target.value,
            }))
          }
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
          onChange={(e) =>
            setQuery((prev) => ({
              ...prev,
              order: e.target.value,
            }))
          }
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </form>
    </section>
  );
}

export default FilterBar;
