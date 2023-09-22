import { useOutletContext } from "react-router-dom";

const Team = () => {
  const value = useOutletContext();
  return <div>Team{value}</div>;
};

export default Team;
