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
    <div className="relative flex justify-center  mt-36 bg-white h-screen">
      <div className="absolute w-full h-10 bg-gradient-to-t from-white to-transparent -top-8" />
      <form className=" pt-24 space-y-10 ">
        <label className="form_label">
          <p className="form-title">Título:</p>
          <input className="imput-form" type="text" value={task.title} />
        </label>
        <label className="form_label">
          <p className="form-title"> Descripción:</p>
          <input className="imput-form" type="text" value={task.description} />
        </label>
        <div className="flex space-x-10">
          <label className="form_label">
            <p className="form-title">Fecha de inicio:</p>
            <input
              className="imput-form-date"
              type="date"
              value={task.startDate}
            />
          </label>
          <label className="form_label">
            <p className="form-title"> Fecha de finalización:</p>
            <input
              className="imput-form-date"
              type="date"
              value={task.endDate}
            />
          </label>
        </div>
        <div className="flex pt-10 justify-center space-x-10 ">
          <button
            className="border rounded-3xl w-60 py-3 text-base bg-[#004FC6] border-[#004FC6] text-white"
            type="submit"
          >
            Guardar cambios
          </button>
          <button
            className="border rounded-3xl w-60 py-3 text-base bg-gray-200 border-[#004FC6] text-[#004FC6]"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEdit;
