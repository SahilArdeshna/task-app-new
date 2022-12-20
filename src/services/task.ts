import axios from "./axios";
import { ITask } from "../types/ITask";

export async function addTask(task: string) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/tasks`,
      {
        description: task,
      }
    );

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getTasks() {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/tasks`
    );

    return data;
  } catch (err) {
    return err;
  }
}

export async function updateTask(updateValue: ITask) {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/tasks/${updateValue._id}`,
      {
        completed: updateValue.completed,
        description: updateValue.description,
      }
    );

    return res;
  } catch (err) {
    return err;
  }
}

export async function deleteTask(id: string) {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/tasks/${id}`
    );

    return res;
  } catch (err) {
    return err;
  }
}
