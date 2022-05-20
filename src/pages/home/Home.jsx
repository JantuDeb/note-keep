import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import { useNavigation } from "../../context/NavigationProvider";

export const Home = () => {
  const { setShowSidebar } = useNavigation();
  return (
    <>
      <header>
        <button className="btn-menu" onClick={() => setShowSidebar((v) => !v)}>
          <AiOutlineMenuUnfold size={30} />
        </button>
      </header>
      <main className="flex py-2">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};
