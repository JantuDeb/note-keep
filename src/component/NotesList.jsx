import React from "react";
import { useNotes } from "../hooks/useNotes";
import Loader from "./loader/Loader";
import Note from "./Note";
const NotesList = () => {
  const { isLoading, isError, data, error, isSuccess } = useNotes();
  const activeNotes = isSuccess
    ? data?.notes?.filter((note) => note.status === "active")
    : [];
  const pinnedNotes = activeNotes?.filter((note) => note.pin === true) ??[];
  const unPinnedNotes = activeNotes?.filter((note) => note.pin === false)??[];

  
  return (
    <div className="py-4 w-full">
      <div></div>
      {isError && (
        <p className="text-center text-red">{error?.response?.data?.message}</p>
      )}
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          {pinnedNotes.length !== 0 && (
            <p className="m-0 text-gray font-medium">PINNED</p>
          )}
          <div className="flex wrap gap-2 w-full">
            {pinnedNotes.map((note) => (
              <Note key={note._id} note={note} />
            ))}
          </div>
          {unPinnedNotes.length !== 0 && (
            <p className="m-0 text-gray font-medium">OTHERS</p>
          )}
          <div className="flex wrap w-full gap-2">
            {unPinnedNotes.map((note) => (
              <Note key={note._id} note={note} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NotesList;
