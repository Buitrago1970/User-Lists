import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

function PersonPage({ id }) {
  const [person, setPerson] = useState({});
  const [tasks, setTasks] = useState([]);

  const router = useRouter();
  id = parseInt(router.query.id);
  // get user data from id by URL
  useEffect(() => {
    async function fetchPerson() {
      const res = await axios.get(`http://localhost:3001/people/${id}`);
      setPerson(res.data);
    }
    fetchPerson();
  }, [id]);
  //get task data by id
  useEffect(() => {
    async function fetchTasks() {
      const res = await axios.get("http://localhost:3001/tasks");
      const personTasks = res.data.filter((item) => item.personId === id);
      setTasks(personTasks);
    }
    fetchTasks();
  }, [id]);

  return (
    <>
      {/* user data */}
      <h1>{person.fullName}</h1>
      <p>Edad: {person.age}</p>
      <p>Ocupación: {person.occupation}</p>
      <p>Apodo: {person.nickname}</p>
      <p>Género: {person.gender}</p>
      <Image
        src={person.picture}
        alt={person.fullName}
        width={100}
        height={100}
      />
      <Link href="/profile/[id]/edit" as={`/profile/${person.id}/edit`}>
        <button>Editar</button>
      </Link>
      {/* task data */}
      <h2>Tareas</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha de inicio</th>
            <th>Completado</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.startDate}</td>
              {task.completed ? <td>True</td> : <td>False</td>}
              <Link href="/tasks/[id]/edit" as={`/tasks/${task.id}/edit`}>
                <button>Editar</button>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PersonPage;
