import React, { useState } from "react";
import { BsPinFill, BsPin } from "react-icons/bs";
import { FaTrashRestore } from "react-icons/fa";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { MdOutlineColorLens, MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { colors } from "../utils";
import EditNote from "./EditNote";
import { useDeleteNotes } from "../hooks/useDeleteNotes";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { useUpdateNoteStatus } from "../hooks/useUpdateNoteStatus";

const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const { _id, title, pin, description, color, label, status, priority } = note;

  const { mutate: deleteNote } = useDeleteNotes();
  const { mutate: updateNote } = useUpdateNote();
  const { mutate: updateStatus } = useUpdateNoteStatus();

  function colorClickHandler(color) {
    updateNote({ _id, color });
    setShowColors((c) => !c);
  }

  return (
    <div
      className={`p-2 border radius-md note flex-col justify-between ${color}`}
    >
      <div>
        <div className="flex justify-between">
          <h4>{title}</h4>
          <div className="flex gap-2">
            <span className="font-medium">  Priority: {priority}</span>
            <span
              className="icon-action flex center"
              onClick={() => updateNote({ _id, pin: !pin })}
            >
              {pin ? <BsPinFill size="20px" /> : <BsPin size="20px" />}
            </span>
          </div>
        </div>
        <p>{description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="radius-md px-2 bg-semi-transparent">{label}</span>
        <div className="flex item-center">
          <span className="icon-action flex center">
            <MdOutlineColorLens
              size="20px"
              className="cursor-pointer"
              onClick={() => setShowColors((c) => !c)}
            />
          </span>
          {status === "active" && (
            <span className="icon-action flex center">
              <BiArchiveIn
                size="20px"
                className="cursor-pointer"
                onClick={() => updateStatus({ _id, status: "archive" })}
              />
            </span>
          )}
          {status === "archive" && (
            <span className="icon-action flex center">
              <BiArchiveOut
                size="20px"
                className="cursor-pointer"
                onClick={() => updateStatus({ _id, status: "active" })}
              />
            </span>
          )}
          <span className="icon-action flex center">
            <FaRegEdit
              size="20px"
              className="cursor-pointer"
              onClick={() => setIsEditing((isEditing) => !isEditing)}
            />
          </span>

          {status === "trashed" ? (
            <>
              <span className="icon-action flex center">
                <FaTrashRestore
                  size="20px"
                  className="cursor-pointer"
                  onClick={() => updateStatus({ _id, status: "active" })}
                />
              </span>
              <span className="icon-action flex center">
                <MdOutlineDelete
                  size="25px"
                  className="cursor-pointer"
                  onClick={() => deleteNote(_id)}
                />
              </span>
            </>
          ) : (
            <span className="icon-action flex center">
              <MdOutlineDelete
                size="23px"
                className="cursor-pointer"
                onClick={() => updateStatus({ _id, status: "trashed" })}
              />
            </span>
          )}
        </div>
      </div>
      {showColors && (
        <div className="colors-container flex center">
          <div className="flex bg-white radius-md shadow-gray colors-bar p-1 border">
            {colors.map((c, index) =>
              index === 0 ? (
                <div
                  key={c}
                  onClick={() => colorClickHandler(c)}
                  className={`${c} color-box border`}
                ></div>
              ) : (
                <div
                  key={c}
                  onClick={() => colorClickHandler(c)}
                  className={`${c} color-box`}
                ></div>
              )
            )}
          </div>
        </div>
      )}

      {isEditing && (
        <div className="edit-box flex center">
          <EditNote noteToEdit={note} setIsEditing={setIsEditing} />
        </div>
      )}
    </div>
  );
};

export default Note;
