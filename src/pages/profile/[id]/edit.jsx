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
  function handleCancel() {
    if (window.confirm("¿Seguro que deseas cancelar los cambios?")) {
      router.back();
    }
  }

  return (
    <div className="relative flex justify-center  mt-36 bg-white h-screen">
      <div className="absolute w-full h-10 bg-gradient-to-t from-white to-transparent -top-8" />
      <form className=" pt-24 space-y-10 ">
        <label className="form_label">
          <p className="form-title">Nombre completo:</p>
          <input className="imput-form" type="text" value={person.fullName} />
        </label>
        <label className="form_label">
          <p className="form-title">Edad:</p>

          <input className="imput-form" type="number" value={person.age} />
        </label>
        <label className="form_label">
          <p className="form-title">Ocupación:</p>

          <input className="imput-form" type="text" value={person.occupation} />
        </label>
        <label className="form_label">
          <p className="form-title">Apodo:</p>

          <input className="imput-form" type="text" value={person.nickname} />
        </label>
        <label className="form_label">
          <p className="form-title">Género:</p>

          <input className="imput-form" type="text" value={person.gender} />
        </label>
        <label className="form_label">
          <p className="form-title">Imagen:</p>

          <input className="imput-form" type="text" value={person.picture} />
        </label>
        <div className="flex pt-10 justify-center space-x-10 ">
          <button
            className="border rounded-3xl w-60 py-3 text-base bg-[#004FC6] border-[#004FC6] text-white hover:bg-[#0043A8]"
            type="submit"
          >
            Guardar cambios
          </button>

          <button
            className="border rounded-3xl w-60 py-3 text-base bg-gray-200 border-[#004FC6] text-[#004FC6] hover:bg-[#C2C2C2]"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
