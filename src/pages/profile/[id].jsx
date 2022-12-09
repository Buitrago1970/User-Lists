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
      <div className="flex flex-col items-center text-center justify-between  relative md:flex md:text-start md:flex-row">
        <div className="bottom-[434px] absolute w-full h-10 bg-gradient-to-t from-white to-transparent md:bottom-[200px]" />
        <div className=" block mx-10 md:flex">
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
          <div className="m-0 md:ml-14">
            <h1 className="text-5xl font-bold relative bottom-11">
              {person.fullName}
            </h1>

            <div className="">
              <p className="info-titles">Age: {person.age}</p>
              <p className="info-titles">Occupation:{person.occupation} </p>
              <p className="info-titles">Nickname: {person.nickname}</p>
              <p className="info-titles">Gender:{person.gender} </p>
            </div>
          </div>
        </div>

        <div className="mt-8 mx-10">
          <Link href="/profile/[id]/edit" as={`/profile/${person.id}/edit`}>
            <button className="border rounded-2xl w-40 py-2 text-sm bg-gray-50 border-blue-600 text-blue-600 hover:bg-gray-200">
              EDIT PROFILE
            </button>
          </Link>
        </div>
      </div>

      {/* task data */}
      <div className="w-full m-auto mt-5 md:w-3/4">
        <h2 className="text-center text-3xl font-bold mb-7 mt-14">Tasks</h2>
        <div className=" text-center h-60 p-4 bg-white rounded-t-3xl  box-shadow-car-task box-shadow-card-top w-full lg:p-8">
          <table className="h-full w-full">
            <thead className="mb-10">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>Completed</th>
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
