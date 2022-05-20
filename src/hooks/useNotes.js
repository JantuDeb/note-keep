import axios from "axios";
import { useQuery } from "react-query";
import { axiosConfig } from "../utils";

export const useNotes = () => {
  return useQuery("notes", () =>
    axios.get("/notes", axiosConfig).then((res) => res.data)
  );
};
