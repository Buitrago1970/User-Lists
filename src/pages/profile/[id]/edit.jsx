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
    <div className="relative flex justify-center  mt-36 bg-white h-screen">
      <div className="absolute w-full h-10 bg-gradient-to-t from-white to-transparent -top-8" />
      <form className=" pt-24 space-y-10 " onSubmit={handleSubmit}>
        <label className="form_label">
          <p className="form-title">fullName:</p>
          <input
            className="imput-form"
            type="text"
            value={person.fullName}
            onChange={(event) => handleChange(event, "fullName")}
          />
        </label>
        <label className="form_label">
          <p className="form-title">age:</p>

          <input
            className="imput-form"
            type="number"
            value={person.age}
            onChange={(event) => handleChange(event, "age")}
          />
        </label>
        <label className="form_label">
          <p className="form-title">occupation:</p>

          <input
            className="imput-form"
            type="text"
            value={person.occupation}
            onChange={(event) => handleChange(event, "occupation")}
          />
        </label>
        <label className="form_label">
          <p className="form-title">nickname:</p>

          <input
            className="imput-form"
            type="text"
            value={person.nickname}
            onChange={(event) => handleChange(event, "nickname")}
          />
        </label>
        <label className="form_label">
          <p className="form-title">gender:</p>

          <input
            className="imput-form"
            type="text"
            value={person.gender}
            onChange={(event) => handleChange(event, "gender")}
          />
        </label>
        <label className="form_label">
          <p className="form-title">Imagen:</p>

          <input
            className="imput-form"
            type="text"
            value={person.picture}
            onChange={(event) => handleChange(event, "picture")}
          />
        </label>
        <div className="flex pt-10 justify-center space-x-10 ">
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
