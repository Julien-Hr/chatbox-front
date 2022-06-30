import React from 'react'

interface IMessage {
  from: string,
  to: string,
  date: string,
  content: string
  userID: string
}

export default function Message(props: IMessage) {
  
  //userID
  if (props.from === props.userID) {
    return (
      <div className="w-full h-fit flex justify-end snap-end">
        <div className=" border text-white bg-gradient-to-br from-blue-500 to-indigo-600 bg- w-fit pl-2 pr-5 p-2 rounded-xl">
          <p className=" text-xs">{props.date}</p>
          <p>{props.content}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-fit flex justify-start snap-end">
        <div className="border bg-gradient-to-bl from-slate-600 to-neutral-500 text-white w-fit pl-2 pr-5 p-2 rounded-xl">
          <p className=" text-xs">{props.date}</p>
          <p>{props.content}</p>
        </div>
      </div>
    );
    
  }
}
