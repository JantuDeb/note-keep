import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { axiosConfig } from "../utils";

export const useDeleteNotes = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (noteId) =>
      axios.delete("/note/" + noteId, axiosConfig).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("notes", (oldData) => {
          return {
            ...oldData,
            notes: oldData.notes.filter((note) => note._id !== data.note._id),
          };
        });
      },
    }
  );
};
