import { NavLink, useLoaderData } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";

const TeamNav = () => {
  const teamMembers = useLoaderData();
  const { data, isError, isLoading } = useFetch("users");
  console.log(data);
  return (
    <>
      <ul>
        {teamMembers.map((member) => (
          <li key={member.id}>
            <NavLink to={member.id.toString()}>Team - {member.name} </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TeamNav;
