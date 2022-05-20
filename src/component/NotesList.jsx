import React, { useReducer } from "react";
import { useNotes } from "../hooks/useNotes";
import { filterReducer, getFilteredNotes, getSortedNotes, initialState } from "../utils";
import Loader from "./loader/Loader";
import Note from "./Note";


const NotesList = () => {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialState);
  const { isLoading, isError, data, error, isSuccess } = useNotes();
  const activeNotes = isSuccess
    ? data?.notes?.filter((note) => note.status === "active")
    : [];

  const notesToShow = getSortedNotes(
    filterState,
    getFilteredNotes(filterState, activeNotes)
  );
  const pinnedNotes = notesToShow?.filter((note) => note.pin === true) ?? [];
  const unPinnedNotes = notesToShow?.filter((note) => note.pin === false) ?? [];

  const handleSort = (e) => {
    filterDispatch({
      type: "SORT",
      payload: {
        name: e.target.value,
      },
    });
  };

  return (
    <div className="py-4 w-full">
      <div className="flex items-center gap-1 wrap">
        <ul className="list-unstyled flex justify-between">
          <span className="font-medium text-gray">Priority:</span>
          {["High", "Medium", "Low"].map((priority) => {
            const p = priority.toLowerCase();
            return (
              <li key={priority}>
                <label>
                  <input
                    type="checkbox"
                    className="p-1"
                    checked={filterState.priority[p]}
                    onChange={() =>
                      filterDispatch({
                        type: "FILTER_PRIORITY",
                        payload: { priority: p },
                      })
                    }
                  />
                  <span className="p-1">{priority}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <div>
          <span className="font-medium text-gray">Sort by:</span>
          <select
            name="priority"
            id="category"
            className="m-1 p-1 radius-md"
            value={filterState.sortBy.name}
            onChange={handleSort}
          >
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </div>
      </div>
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
