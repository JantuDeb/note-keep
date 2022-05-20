import { BiPlus } from "react-icons/bi";
const AddCategory = ({handleCategoryClick, value, setValue}) => {
  return (
    <div className="flex items-center justify-between p-1">
      <input
        type="text"
        placeholder="Enter a new category"
        className="input input-category grow"
        autoFocus={true}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <BiPlus
        size="20px"
        className="cursor-pointer"
        onClick={() => handleCategoryClick()}
      />
    </div>
  );
};

export default AddCategory;
