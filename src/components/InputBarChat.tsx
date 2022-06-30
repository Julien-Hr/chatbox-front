import React from "react";
import { FaPaperPlane } from "react-icons/fa";

interface IInputBarChat {
  textValue: string;
  setTextValue: any;
  action: any;
  condition: boolean;
}

export default function InputBarChat(props: IInputBarChat) {
  if (props.condition) {
    return (
      <div className="flex mt-5">
        <input
          className="w-full border border-slate-200 bg-slate-100 pl-2 rounded-lg shadow-lg"
          type="text"
          placeholder="Aa"
          value={props.textValue}
          onChange={(e) => props.setTextValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? props.action(e) : null}
        />
        <button
          className="ml-2 p-2 pl-5 pr-5 rounded-lg bg-indigo-600 text-white shadow-lg"
          onClick={props.action}
        >
          <FaPaperPlane />
        </button>
      </div>
    );
  } else {
    return null;
  }
}
