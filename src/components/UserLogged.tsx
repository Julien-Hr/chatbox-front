import React from "react";
import { FaUserAlt } from "react-icons/fa";

interface IUserLogged {
  condition: boolean;
  username: string;
  action?: any;
}

export default function UserLogged(props: IUserLogged) {
  if (props.condition) {
    return (
      <div>
        <h2
          className="flex p-2 items-center w-full border-2 border-indigo-600 
      text-2xl text-indigo-600 font-semibold rounded-lg shadow-lg cursor-pointer"
          onClick={() => props.action()}
        >
          <FaUserAlt className="mr-2"></FaUserAlt>
          {props.username}
        </h2>
      </div>
    );
  } else {
    return null;
  }
}
