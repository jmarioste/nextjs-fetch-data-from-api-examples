import React, { useEffect, useState } from "react";

// anticipate the returned response
type TodoResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
const Example1UseEffect = () => {
  // set the states for data,loading, and error
  const [data, setData] = useState<TodoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTodo = () => {
    // set loading to true before calling fetch
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/todos/1`)
      .then(async (res) => {
        // set the data if the response is successful
        const todo: TodoResponse = await res.json();
        setData(todo);
      })
      .catch((e) => {
        // set the error if there's an error like 404, 400, etc
        if (e instanceof Error) {
          setError(e.message);
        }
      })
      .finally(() => {
        // set loading to false after everything has completed.
        setLoading(false);
      });
  };

  // use useEffect to load data after the first render
  //   useEffect(fetchTodo, []);

  // display for loading component
  const loadingComponent = <div>Loading...</div>;
  // display for error component
  const errorComponent = <div className="text-red-500">Error: {error}</div>;

  // display loading, error and data based on the state
  return (
    <div className="p-10">
      <button onClick={fetchTodo}>Fetch Todo</button>
      {loading ? (
        loadingComponent
      ) : error ? (
        errorComponent
      ) : (
        <div>
          <p>Loading complete and no errors. Displaying data...</p>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
      )}
    </div>
  );
};

export default Example1UseEffect;
