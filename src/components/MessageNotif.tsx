import React from "react";
import { INotif } from "../interface/INotif";

interface IMessageNotif {
  notif: INotif[];
  userID: string;
}

export default function MessageNotif(props: IMessageNotif) {
  const userNotif = props.notif.find(u => u.userID === props.userID)
  if (userNotif && userNotif.count > 0) {
    return (
      <div className="flex justify-end w-full mr-2">
        <span className="rounded-md font-medium text-white bg-red-600 flex justify-center items-center w-6 h-6">
          {userNotif.count > 9 ? '9+' : userNotif.count}
        </span>
      </div>
    );
  } else return null
  
}
