import React from "react";
type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

export default function useFetch(pageNumber: number) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);
  const [hasMore, setHasMore] = React.useState(false);

  async function fetchUsers() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${pageNumber}`
      );
      const data = await response.json();
      setUsers((prevUsers) => {
        // In react 18 dev mode useEffect fires twice https://stackoverflow.com/questions/72238175/useeffect-is-running-twice-on-mount-in-react
        // so we need to check if the data is already there

        const newUsers = prevUsers;
        data.data.forEach((user: any) => {
          if (!newUsers.find((u) => u.id === user.id)) {
            newUsers.push(user);
          }
        });
        return newUsers;
      });
      setHasMore(data.data.length > 0);

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }

  React.useEffect(() => {
    const controller = new AbortController();
    fetchUsers();
    return () => {
      controller.abort();
    };
  }, [pageNumber]);
  return { loading, error, users, hasMore };
}
