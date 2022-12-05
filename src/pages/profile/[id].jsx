import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

function PersonPage({ id }) {
  const [person, setPerson] = useState({});
  const [tasks, setTasks] = useState([]);

  const router = useRouter();
  id = parseInt(router.query.id);

  useEffect(() => {
    async function fetchPerson() {
      const res = await axios.get(`http://localhost:3001/people/${id}`);
      setPerson(res.data);
    }
    fetchPerson();
  }, [id]);

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
      <button>Editar</button>

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
            </tr>
          ))}
        </tbody>
        <button>Editar</button>
      </table>
    </>
  );
}

export default PersonPage;
