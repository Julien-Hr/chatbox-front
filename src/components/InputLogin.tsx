import React from 'react';


interface inputLogin {
  placeholder: string,
  username: string,
  setUsername: any,
  loggin: any,
  condition ?: boolean,
}

export default function InputLogin(props: inputLogin) {
  if (!props.condition) {
    return (
      <div className="flex">
        <input
          className="border pl-2 bg-slate-100 w-full rounded-lg shadow-lg"
          placeholder={props.placeholder}
          type="text"
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
          onKeyDown={(e)=> e.key === 'Enter' ? props.loggin(e) : null}
        />
        <button
          className="bg-indigo-700 rounded-lg
                text-xl text-white font-semibold 
                p-2 w-fit  cursor-pointer shadow-lg ml-2"
          onClick={props.loggin}
        >
          <p className=' whitespace-nowrap'>Log in</p>
        </button>
      </div>
    );
  } else {
    return null
  }
  
}
