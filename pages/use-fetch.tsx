import React from "react";
import { useFetch } from "usehooks-ts";
// anticipate the returned response
type TodoResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
const UseFetchExample = () => {
  const { data, error } = useFetch<TodoResponse>(
    `https://jsonplaceholder.typicode.com/todos/1`
  );
  // derive the loading state based on data and error state
  const loading = !data && !error;
  // display for loading component
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
    <div>
      {loading ? (
        loadingComponent
      ) : error ? (
        errorComponent
      ) : (
        <div className="p-10">
          <p>Displaying Todo:</p>
          <div>
            <p>id: {data?.id}</p>
            <p>userId: {data?.userId}</p>
            <p>title: {data?.title}</p>
            <p>completed: {data?.completed}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseFetchExample;
