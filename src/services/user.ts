import axios from "./axios";

export async function signup(payload: any) {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users`,
    payload
  );

  return data;
}

export async function login(payload: any) {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/login`,
    payload
  );

  return data;
}

export async function me() {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/me`
  );

  return data;
}

export async function updateUser(payload: any) {
  const { data } = await axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/users/me`,
    payload
  );

  return data;
}

export async function logout() {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/logout`
  );

  return data;
}

export async function logoutAll() {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/logoutAll`
  );

  return data;
}

export async function uploadProfile(payload: any) {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/me/avatar`,
    payload
  );

  return data;
}

export async function deleteProfile() {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/users/me/avatar`
  );

  return data;
}

export async function getProfile(userId: any) {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/avatar`
  );

  return data;
}
