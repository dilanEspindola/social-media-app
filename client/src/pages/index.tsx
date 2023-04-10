import { useState } from "react";

const Home = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1>home</h1>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
      <input type="text" value="{null, null, -1663256698105557687}" />
    </div>
  );
};

export default Home;
