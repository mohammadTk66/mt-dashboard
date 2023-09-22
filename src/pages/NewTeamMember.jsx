import { useOutletContext } from "react-router-dom";

const NewTeamMember = () => {
  const value = useOutletContext();
  return <div>NewTeamMember{value}</div>;
};

export default NewTeamMember;
