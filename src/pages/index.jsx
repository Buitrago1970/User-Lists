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
      <ul className=" flex flex-col items-center mt-20 w-full">
        {people.map((person) => (
          <li
            key={person.id}
            className="px-6 py-2 cursor-pointer bg-white border border-black rounded-lg m-2 box-shadow-card w-2/3 g:w-1/2 xl:w-2/3 flex items-center hover:bg-slate-200
      "
          >
            <Link href="/profile/[id]" as={`/profile/${person.id}`}>
              <div className="flex">
                <Image
                  src={person.picture}
                  alt={person.fullName}
                  width={90}
                  height={90}
                  objectFit="contain"
                />
                <div className="text-sm ml-5 text-gray-800 itlic">
                  <h1 className="font-bold text-2xl mb-1 text-black not-italic">
                    {person.fullName}
                  </h1>
                  <p>Edad: {person.age}</p>
                  <p>Género: {person.gender}</p>
                  <p>Ocupación: {person.occupation}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
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
