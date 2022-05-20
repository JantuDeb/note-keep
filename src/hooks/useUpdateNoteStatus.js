import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { axiosConfig } from "../utils";

export const useUpdateNoteStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) =>
      axios
        .patch("/note/" + data._id, { status: data.status }, axiosConfig)
        .then((res) => res.data),
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
