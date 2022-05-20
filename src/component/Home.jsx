import React from "react";
import { useNavigation } from "../context/NavigationProvider";
import Notes from "../pages/Notes";

const Home = () => {
  const { currentPage } = useNavigation();
  return <>{currentPage === "notes" && <Notes />}</>;
};

export default Home;
