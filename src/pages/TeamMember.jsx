import { useLoaderData } from "react-router-dom";

const TeamMember = () => {
  const member = useLoaderData();
  return <div>TeamMember-{member.name}</div>;
};

export default TeamMember;
