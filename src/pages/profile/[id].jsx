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
    <div className="mt-36 bg-white ">
      {/* user data */}

      <div className="flex justify-between  relative">
        <div className="absolute w-full h-10 bg-gradient-to-t from-white to-transparent bottom-[200px]" />
        <div className=" flex mx-10 ">
          <div className=" relative bottom-20">
            <Image
              src={person.picture}
              alt={person.fullName}
              width={200}
              height={200}
              objectFit="contain"
              className="rounded-full border-1 border-black"
            />
          </div>
          <div className="ml-14">
            <h1 className="text-5xl font-bold relative bottom-11">
              {person.fullName}
            </h1>

            <div className="">
              <p className="info-titles">Edad: {person.age}</p>
              <p className="info-titles">Ocupación:{person.occupation} </p>
              <p className="info-titles">Apodo: {person.nickname}</p>
              <p className="info-titles">Género:{person.gender} </p>
            </div>
          </div>
        </div>

        <div className="mt-8 mx-10">
          <Link href="/profile/[id]/edit" as={`/profile/${person.id}/edit`}>
            <button className="border rounded-2xl w-40 py-2 text-sm bg-gray-50 border-blue-600 text-blue-600 hover:bg-gray-200">
              EDITAR PERFIL
            </button>
          </Link>
        </div>
      </div>

      {/* task data */}
      <div className="w-3/4 m-auto mt-5">
        <h2 className="text-3xl font-bold mb-14 ">Tareas</h2>
        <div className=" text-center h-60 p-8 bg-white rounded-t-3xl  box-shadow-car-task box-shadow-card-top w-full">
          <table className="h-full w-full">
            <thead className="mb-10">
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
                  <td>{task.completed ? <>True</> : <>False</>}</td>
                  <td>
                    <Link href="/tasks/[id]/edit" as={`/tasks/${task.id}/edit`}>
                      <button className="text-[#004FC6] underline hover:text-blue-500">
                        edit task
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PersonPage;
