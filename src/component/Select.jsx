import React from "react";

export const Select = ({ priority, setPriority }) => {
  return (
    <select
      name="priority"
      id="category"
      className="m-1 p-1 radius-md"
      value={priority}
      onChange={(e) => setPriority(note=>({...note, [e.target.name]:e.target.value}))}
    >
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  );
};
