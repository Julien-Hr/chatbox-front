import React from "react";
import { INotif } from "../interface/INotif";
import { IUser } from "../interface/IUser";
import MessageNotif from "./MessageNotif";

interface IInfoUser {
  userlog: any;
  users: IUser[];
  action: any;
  condition: boolean;
  notif?: INotif[];
  setNotif: any;
}

export default function InfoUser(props: IInfoUser) {
  if (props.condition) {
    if (props.users.length > 0) {
      return (
        <div className="w-fit ">
          {props.userlog}
          <div className="border border-slate-100 mt-5 rounded-xl">
            <div className="shadow-lg rounded-t-xl ">
              <h3 className="font-semibold text-lg text-indigo-600 p-2 pl-4 pr-4 ">
                Users connected :
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-0 rounded-b-xl shadow-lg">
              {props.users.map((u: IUser, index) => {
                return (
                  <div
                    key={index}
                    className="flex border-t border-indigo-600 bg-slate-100 items-center cursor-pointer"
                    onClick={() => {
                      const newNotif = props.notif!.filter(n => n.userID !== u.userID)
                      props.setNotif(newNotif)
                      props.action(u)
                    }}
                  >
                    <p
                      className={` font-semibold text-md  grid content-center text-indigo-700 
                       pl-4 p-2
                      ${
                        props.users.length === index + 1 ? "rounded-b-xl" : ""
                      }  `}
                    >
                      {u.username}
                    </p>
                    <MessageNotif notif={props.notif!} userID={u.userID} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-fit mt-5">
          {props.userlog}
          <div className="mt-5 font-semibold text-indigo-600">
            No one connected
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
}
