import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function ProfileEdit({ id }) {
  const [person, setPerson] = useState({});

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
  // btn cancel send form
  function handleCancel() {
    if (window.confirm("Are you sure you want to cancel the changes?")) {
      router.back();
    }
  }
  function handleChange(event, field) {
    setPerson({ ...person, [field]: event.target.value });
  }
  //submit the form with the new values
  function handleSubmit(event) {
    event.preventDefault();
    if (window.confirm("Are you sure you want to save the changes?")) {
      axios.put(`http://localhost:3001/people/${id}`, person);
      router.push("/");
    }
  }

  return (
    <div className="relative flex justify-center  mt-36 bg-white pb-10">
      <div className="absolute w-full h-10 bg-gradient-to-t from-white to-transparent -top-8" />
      <form className=" pt-24 space-y-10 " onSubmit={handleSubmit}>
        <label className="flex flex-col space-y-2">
          <p className="w-1/3 ">fullName:</p>
          <input
            className="bg-[#ececec] border border-black rounded-xl h-12 text-xl p-3 w-full"
            type="text"
            value={person.fullName}
            onChange={(event) => handleChange(event, "fullName")}
          />
        </label>
        <label className="flex flex-col space-y-2">
          <p className="w-1/3 ">age:</p>

          <input
            className="bg-[#ececec] border border-black rounded-xl h-12 text-xl p-3 w-full"
            type="number"
            value={person.age}
            onChange={(event) => handleChange(event, "age")}
          />
        </label>
        <label className="flex flex-col space-y-2">
          <p className="w-1/3 ">occupation:</p>

          <input
            className="bg-[#ececec] border border-black rounded-xl h-12 text-xl p-3 w-full"
            type="text"
            value={person.occupation}
            onChange={(event) => handleChange(event, "occupation")}
          />
        </label>
        <label className="flex flex-col space-y-2">
          <p className="w-1/3 ">nickname:</p>

          <input
            className="bg-[#ececec] border border-black rounded-xl h-12 text-xl p-3 w-full"
            type="text"
            value={person.nickname}
            onChange={(event) => handleChange(event, "nickname")}
          />
        </label>
        <label className="flex flex-col space-y-2">
          <p className="w-1/3 ">gender:</p>

          <input
            className="bg-[#ececec] border border-black rounded-xl h-12 text-xl p-3 w-full"
            type="text"
            value={person.gender}
            onChange={(event) => handleChange(event, "gender")}
          />
        </label>
        <label className="flex flex-col space-y-2">
          <p className="w-1/3 ">Imagen:</p>

          <input
            className="bg-[#ececec] border border-black rounded-xl h-12 text-xl p-3 w-full"
            type="text"
            value={person.picture}
            onChange={(event) => handleChange(event, "picture")}
          />
        </label>
        <div className="flex flex-col items-center space-y-6  pt-10 justify-center md:space-x-10 md:flex-row md:space-y-0">
          <button
            className="border rounded-3xl w-60 py-3 text-base bg-[#004FC6] border-[#004FC6] text-white hover:bg-[#0043A8]"
            type="submit"
          >
            Save Changes
          </button>

          <button
            className="border rounded-3xl w-60 py-3 text-base bg-gray-200 border-[#004FC6] text-[#004FC6] hover:bg-[#C2C2C2]"
            onClick={handleCancel}
            type="reset"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
