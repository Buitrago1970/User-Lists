import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

function HomePage(data) {
  const [people, setPeople] = useState([]);
  // ordered list alphabetical
  useEffect(() => {
    setPeople(data.data.sort((a, b) => a.fullName.localeCompare(b.fullName)));
  }, [data]);

  return (
    <ul>
      {people.map((person) => (
        <li key={person.id}>
          <Image
            src={person.picture}
            alt={person.fullName}
            width={100}
            height={100}
          />
          <h1>{person.fullName}</h1>
          <p>Edad: {person.age}</p>
          <p>Género: {person.gender}</p>
          <p>Ocupación: {person.occupation}</p>
        </li>
      ))}
    </ul>
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
