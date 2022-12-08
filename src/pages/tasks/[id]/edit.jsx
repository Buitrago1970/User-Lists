import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function TaskEdit({ id }) {
  const [task, setTasks] = useState([]);

  const router = useRouter();
  id = parseInt(router.query.id);

  //get task data by id
  useEffect(() => {
    async function fetchTasks() {
      const res = await axios.get(`http://localhost:3001/tasks/${id}`);
      setTasks(res.data);
    }
    fetchTasks();
  }, [id]);
  function handleCancel() {
    if (window.confirm("¿Seguro que deseas cancelar los cambios?")) {
      router.back();
    }
  }
  if (!task) {
    return <p>No se encontró ninguna tarea con el ID especificado.</p>;
  }
  return (
    <>
      <h1>Editar tarea</h1>
      <form>
        <label>
          Título:
          <input type="text" value={task.title} />
        </label>
        <label>
          Descripción:
          <input type="text" value={task.description} />
        </label>
        <label>
          Fecha de inicio:
          <input type="date" value={task.startDate} />
        </label>
        <label>
          Fecha de finalización:
          <input type="date" value={task.endDate} />
        </label>
        <button type="submit">Guardar cambios</button>
        <button onClick={handleCancel}>Cancelar</button>
      </form>
    </>
  );
}

export default TaskEdit;
