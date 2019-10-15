import axios from "axios";

const useAxios = async ({ type, url, body }) => {
  const request = body ? axios[type](url, body) : axios[type](url, body);
  const {
    data: { data },
    status,
    error
  } = await request;
  console.log(data, status, error);
  return { data, status, error };
};

export default useAxios;
