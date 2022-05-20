import React from "react";
import Loader from "../../component/loader/Loader";
import Note from "../../component/Note";
import { useNotes } from "../../hooks/useNotes";

export const Archive = () => {
  const { isLoading, isError, data, error, isSuccess } = useNotes();
  const archiveNotes = isSuccess
    ? data?.notes?.filter((note) => note.status === "archive")
    : [];

  return (
    <div className="py-4 w-full m-2">
      {isError && (
        <p className="text-center text-red">{error?.response?.data?.message}</p>
      )}
      {isLoading && <Loader />}
      {archiveNotes.length===0 && <p className="text-center text-gray font-medium">Your archived notes appear here</p> } 
      {isSuccess && (
        <div className="flex wrap w-full gap-2">
          {archiveNotes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};
