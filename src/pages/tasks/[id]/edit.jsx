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

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setTasks({
      ...task,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    //validate input values
    if (!task.title || !task.description || !task.startDate) {
      return alert(
        "Please fill out all required fields (title, description, startDate) to save changes to the task."
      );
    } //check if endDate is set and is before today
    if (task.endDate && new Date(task.endDate) < new Date()) {
      task.completed = true;
    }

    //update task data with new values
    if (window.confirm("Are you sure you want to save the changes?")) {
      axios.put(`http://localhost:3001/tasks/${id}`, task);
      router.push("/");
    }
  }

  function handleCancel() {
    if (window.confirm("Are you sure you want to cancel the changes?")) {
      router.back();
    }
  }

  if (!task) {
    return <p>No task found with the specified ID.</p>;
  }
  return (
    <div className="relative flex justify-center  mt-36 bg-white h-screen">
      <div className="absolute w-full h-10 bg-gradient-to-t from-white to-transparent -top-8" />
      <form className=" pt-24 space-y-10 " onSubmit={handleSubmit}>
        <label className="form_label">
          <p className="form-title">title:</p>
          <input
            className="imput-form"
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
          />
        </label>
        <label className="form_label">
          <p className="form-title"> description:</p>
          <input
            className="imput-form"
            type="text"
            name="description"
            value={task.description}
            onChange={handleInputChange}
          />
        </label>
        <div className="flex space-x-10">
          <label className="form_label">
            <p className="form-title">startDate:</p>
            <input
              className="imput-form-date"
              type="date"
              name="startDate"
              value={task.startDate}
              onChange={handleInputChange}
            />
          </label>
          <label className="form_label">
            <p className="form-title"> endDate:</p>
            <input
              className="imput-form-date"
              type="date"
              name="endDate"
              value={task.endDate}
              onChange={handleInputChange}
            />
          </label>
        </div>
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
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEdit;
