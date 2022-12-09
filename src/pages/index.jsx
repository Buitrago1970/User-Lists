import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

function HomePage(data) {
  const [people, setPeople] = useState([]);
  // ordered list alphabetical
  useEffect(() => {
    setPeople(data.data.sort((a, b) => a.fullName.localeCompare(b.fullName)));
  }, [data]);

  return (
    <div className="">
      <ul className=" flex flex-col items-center mt-20 w-full">
        {people.map((person) => (
          <li
            key={person.id}
            className="px-6 py-2 cursor-pointer bg-white border border-black rounded-[20px] m-2 box-shadow-card w-[60%] flex items-center hover:bg-slate-200 
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
