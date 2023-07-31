import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch("http://127.0.0.1:3000/");
      const data = await res.text();
      setData(data);
    })();
  }, []);
  return <>{data}</>;
}

export default App;
