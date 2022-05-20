import React from "react";
import Loader from "../../component/loader/Loader";
import Note from "../../component/Note";
import { useNotes } from "../../hooks/useNotes";

export const Trash = () => {
  const { isLoading, isError, data, error, isSuccess } = useNotes();
  const trashedNotes = isSuccess
    ? data?.notes?.filter((note) => note.status === "trashed")
    : [];

  return (
    <div className="py-4 w-full m-2">
      {isError && (
        <p className="text-center text-red">{error?.response?.data?.message}</p>
      )}
      {isLoading && <Loader />}
      {trashedNotes.length===0 && <p className="text-center text-gray font-medium">Your trashed notes appear here</p> } 
      {isSuccess && (
        <div className="flex wrap w-full gap-2">
          {trashedNotes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};
