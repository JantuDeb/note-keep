import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { axiosConfig } from "../utils";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => axios.post("/notes", data, axiosConfig).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("notes", (oldData) => {
          if (!oldData) {
            return { notes: [data.note] };
          }
          return { ...oldData, notes: [...oldData.notes, data.note] };
        });
      },
    }
  );
};
