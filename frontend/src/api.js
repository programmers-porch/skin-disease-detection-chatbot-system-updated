import axios from "axios";

export const sendMessage = async (message) => {
  console.log("Calling backend...");

  return axios.post("http://127.0.0.1:8000/chat", {
    message: message
  });
};