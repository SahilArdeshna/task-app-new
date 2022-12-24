import axios from "./axios";
import { ITask } from "../types/ITask";

export async function addTask(task: string) {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/tasks`,
      {
        description: task,
      }
    );

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getTasks(
  skip: number,
  limit: number,
  completed?: string
) {
  try {
    let uri = `${process.env.REACT_APP_API_ENDPOINT}/tasks?limit=${limit}&skip=${skip}`;

    if (completed) {
      uri = uri + `&completed=${completed}`;
    }

    const { data } = await axios.get(uri);
    return data;
  } catch (err) {
    return err;
  }
}

export async function updateTask(updateValue: ITask) {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/tasks/${updateValue._id}`,
      {
        completed: updateValue.completed,
        description: updateValue.description,
      }
    );

    return data;
  } catch (err) {
    return err;
  }
}

export async function deleteTask(id: string) {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/tasks/${id}`
    );

    return data;
  } catch (err) {
    return err;
  }
}
