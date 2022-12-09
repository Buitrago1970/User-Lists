import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

function HomePage(data) {
  const [people, setPeople] = useState([]);
  const [order, setOrder] = useState("asc");

  // ordered list by age
  useEffect(() => {
    if (order === "asc") {
      setPeople(data.data.sort((a, b) => a.age - b.age));
    } else if (order === "desc") {
      setPeople(data.data.sort((a, b) => b.age - a.age));
    } else {
      setPeople(data.data.sort((a, b) => a.fullName.localeCompare(b.fullName)));
    }
  }, [data, order]);

  return (
    <div className="">
      <div className="space-x-5 px-3">
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order === "asc"
            ? "Ordenar de menor a mayor edad"
            : "Ordenar de mayor a menor edad"}
        </button>
        <button
          onClick={() =>
            setOrder(order === "alphabetical" ? "asc" : "alphabetical")
          }
        >
          {order === "alphabetical"
            ? "Cancelar orden alfabético"
            : "Ordenar alfabéticamente"}
        </button>
      </div>{" "}
    </div>
  );
}
// get user data
HomePage.getInitialProps = async () => {
  const res = await axios.get("http://localhost:3001/people");
  const data = res.data;
  return {
    data,
  };
};

export default HomePage;
