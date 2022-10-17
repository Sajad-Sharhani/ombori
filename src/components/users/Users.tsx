import React, { useCallback, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../loader/Loader";
import User from "../user/User";
import "./Users.css";

export default function Users() {
  const [pageNumber, setPageNumber] = React.useState(1);

  const { loading, error, users, hasMore } = useFetch(pageNumber);
  const intObserver = useRef<any>();
  const lastUserRef = useCallback(
    (user: User) => {
      if (loading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (user) intObserver.current.observe(user);
    },
    [loading, hasMore]
  );
  return (
    <div className="users">
      {users.map((user, index) => {
        if (users.length === index + 1) {
          return <User ref={lastUserRef} user={user} key={user.id} />;
        }
        return <User user={user} key={user.id} />;
      })}
      <div>{loading && <Loader />}</div>
      <div>{error && "Error"}</div>
      <div>{!hasMore && "No more users"}</div>
      {/* go back to top button */}
      <button
        className="top-btn"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Top
      </button>
    </div>
  );
}
