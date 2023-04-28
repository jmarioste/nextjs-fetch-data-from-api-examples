import React, { useState } from "react";
import useSWR, { Fetcher } from "swr";
// anticipate the returned response
type TodoResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
// create a fetcher function, just wrap fetch
const fetcher = (key: string) => fetch(key).then((res) => res.json());
const UseSwrExample = () => {
  const [key, setKey] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR<TodoResponse>(key, fetcher);

  const loadingComponent = <div>Loading...</div>;
  // display for error component
  const errorComponent = (
    <div className="text-red-500">
      <h2>Error: {error?.name}</h2>
      <p> {error?.message}</p>
    </div>
  );
  // display to the ui accordingly
  return (
    <div className="p-10">
      <button
        className="bg-indigo-500 p-2"
        onClick={() => setKey(`https://jsonplaceholder.typicode.com/todos/1`)}
      >
        {" "}
        Fetch Data
      </button>
      {isLoading ? (
        loadingComponent
      ) : error ? (
        errorComponent
      ) : (
        <div>
          <p>Displaying Todo:</p>
          <div>
            <p>id: {data?.id}</p>
            <p>userId: {data?.userId}</p>
            <p>title: {data?.title}</p>
            <p>completed: {data?.completed ? "Yes" : "No"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseSwrExample;
