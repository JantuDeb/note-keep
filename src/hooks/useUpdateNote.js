import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { axiosConfig } from "../utils";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) =>
      axios.put("/note/" + data._id, data, axiosConfig).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("notes", (oldData) => {
          return {
            ...oldData,
            notes: oldData.notes.map((note) =>
              note._id === data.note._id ? data.note : note
            ),
          };
        });
      },
    }
  );
};
