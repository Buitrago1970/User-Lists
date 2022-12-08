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
    <>
      <h1>Editar perfil</h1>
      <form>
        <label>
          Nombre completo:
          <input type="text" value={person.fullName} />
        </label>
        <label>
          Edad:
          <input type="number" value={person.age} />
        </label>
        <label>
          Ocupación:
          <input type="text" value={person.occupation} />
        </label>
        <label>
          Apodo:
          <input type="text" value={person.nickname} />
        </label>
        <label>
          Género:
          <input type="text" value={person.gender} />
        </label>
        <label>
          Imagen:
          <input type="text" value={person.picture} />
        </label>
        <button type="submit">Guardar cambios</button>

        <button onClick={handleCancel}>Cancelar</button>
      </form>
    </>
  );
}

export default ProfileEdit;
