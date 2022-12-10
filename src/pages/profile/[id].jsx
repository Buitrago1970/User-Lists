import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

function PersonPage({ id }) {
  const router = useRouter();
  id = parseInt(router.query.id);
  const [data, setData] = useState({
    person: {},
    tasks: [],
  });

  // get user data from id by URL
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:3001/people/${id}`);
      const person = res.data;

      const tasksRes = await axios.get("http://localhost:3001/tasks");
      const personTasks = tasksRes.data.filter((item) => item.personId === id);
      setData({
        person,
        tasks: personTasks,
      });
    }
    fetchData();
  }, [id]);

  return (
    <div className="mt-36 bg-white ">
      {/* user data */}
      <div className="flex flex-col items-center text-center justify-between  relative md:flex md:text-start md:flex-row">
        <div className="bottom-[434px] absolute w-full h-10 bg-gradient-to-t from-white to-transparent md:bottom-[200px]" />
        <div className=" block mx-10 md:flex">
          <div className=" relative bottom-20">
            <Image
              src={data.person.picture}
              alt={data.person.fullName}
              width={200}
              height={200}
              objectFit="contain"
              className="rounded-full border-1 border-black "
            />
          </div>
          <div className="m-0 md:ml-14">
            <h1 className="text-5xl font-bold relative bottom-11">
              {data.person.fullName}
            </h1>

            <div className="mb-10">
              <div className="justify-center flex space-x-3 items-center md:justify-start ">
                <p className="info-titles">Age: </p>
                <p className="text-lg">{data.person.age}</p>
              </div>
              <div className="justify-center flex space-x-3 items-center md:justify-start">
                <p className="info-titles">Occupation: </p>
                <p className="text-lg">{data.person.occupation}</p>
              </div>{" "}
              <div className="justify-center flex space-x-3 items-center md:justify-start">
                <p className="info-titles">Nickname: </p>
                <p className="text-lg">{data.person.nickname}</p>
              </div>{" "}
              <div className="justify-center flex space-x-3 items-center md:justify-start">
                <p className="info-titles">Gender: </p>
                <p className="text-lg">{data.person.gender}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:mb-8 md:mx-10 ">
          <Link
            href="/profile/[id]/edit"
            as={`/profile/${data.person.id}/edit`}
          >
            <button className="border rounded-2xl w-40 py-2 text-sm bg-gray-50 border-blue-600 text-blue-600 shadow-sm hover:bg-gray-200">
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
            <thead className="mb-10 ">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {data.tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.startDate}</td>
                  <td>
                    {" "}
                    <input
                      className="bg-white border rounded-full w-4"
                      type="checkbox"
                      checked={task.completed}
                    />
                  </td>
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
