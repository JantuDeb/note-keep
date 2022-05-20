import React, { useState } from "react";
import { MdCategory } from "react-icons/md";
import AddCategory from "./AddCategory";

const CategorySelector = ({ expanded, setExpanded, label, setNote }) => {
  const [value, setValue] = useState("");

  function handleCategoryClick() {
    setNote((note) => ({ ...note, label: value }));
    setValue("");
    setExpanded((v) => ({ ...v, category: !v.category }));
  }

  return (
    <div className="flex items-center category-container">
      <button
        className="radius-md btn-outline-success flex items-center p-1"
        onClick={() => setExpanded((v) => ({ ...v, category: !v.category }))}
      >
        <span className="mx-1">{label ? label : "Add label"}</span>
        <MdCategory />
      </button>
      <div className={`category ${expanded.category ? "expand" : "collapse"}`}>
        <AddCategory
          handleCategoryClick={handleCategoryClick}
          value={value}
          setValue={setValue}
        />
      </div>
    </div>
  );
};

export default CategorySelector;
