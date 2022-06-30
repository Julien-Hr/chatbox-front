import React, { useEffect } from "react";
import { IMessage } from "../interface/IMessage";
import { IUser } from "../interface/IUser";
import InputBarChat from "./InputBarChat";
import Message from "./Message";

interface IChatBox {
  messages: IMessage[] 
  userSelected ?: IUser
  userId: string
  textValue: string,
  setTextValue: any,
  action: any,
}

export default function ChatBox(props: IChatBox) {

  useEffect(()=>{
    if ( props.userSelected ) {
      const div = document.getElementById('chatbox')!;
      div.scrollTop = div.scrollHeight;
    }
  })

  if ( props.userSelected ) {
    return (
      <div className="w-full col-span-9">
        <div className="border rounded-xl col-span-9 p-2 w-full shadow-lg bg-slate-100">
          <h2 className="text-center text-indigo-600 font-bold">{props.userSelected!.username}</h2>
          <div id="chatbox" className="grid grid-cols-1 gap-2 w-full overflow-y-auto h-[100px] snap-y">
            {props.messages.filter(message => message.from === props.userSelected!.userID 
            || message.to === props.userSelected!.userID ).map((message, idx) => {
              return (
                <Message key={idx} from={message.from} to={message.to} date={message.date} content={message.content} userID={props.userId} />
              )
            })}
            {/* <Message
              from={props.userId}
              to={"id2"}
              date={new Date()}
              content={"Hey"}
              userID={props.userId}
            /> */}
            {/* <Message
              from={"id2"}
              to={props.userId}
              date={new Date()}
              content={"Hello"}
              userID={props.userId}
            /> */}
          </div>
        </div>
        <InputBarChat textValue={props.textValue} setTextValue={props.setTextValue} action={props.action} condition={props.userSelected !== undefined} />
      </div>
    );
  } else {
    return null
  }
  
}
