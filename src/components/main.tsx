import React, { useEffect, useState } from "react";
import { IMessage } from "../interface/IMessage";
import { INotif } from "../interface/INotif";
import { IUser } from "../interface/IUser";
import socket from "../websocket/socket";
import { useToast } from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import InfoUser from "./InfoUser";
import InputLogin from "./InputLogin";
import UserLogged from "./UserLogged";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [otherUserLogged, setOtherUserLogged] = useState<IUser[]>([]);
  const [userSelected, setUserSelected] = useState<IUser>();
  const [message, setMessage] = useState<IMessage[]>([]);
  const [notification, setNotification] = useState<INotif[]>([]);
  const toast = useToast();

  const log = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (username) {
      switch (true) {
        case username.length < 4:
          toast({
            title: "Username too short !",
            position: "top-right",
            description: `username must have more 3 characters`,
            status: "warning",
            duration: 4000,
            isClosable: true,
          });
          break;
        case username.includes(" "):
          toast({
            title: "Username not conform !",
            position: "top-right",
            description: `Your username contains space`,
            status: "warning",
            duration: 4000,
            isClosable: true,
          });
          break;
        default:
          socket.auth = { username: username };
          socket.connect();
          break;
      }
    }
  };

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (inputMessage) {
      const message: IMessage = {
        from: socket.id,
        to: userSelected!.userID,
        date: new Date().toString().split(" ")[4],
        content: inputMessage,
      };

      setMessage((old) => [...old, message]);

      socket.emit("private message", message);
      setInputMessage("");
    }
  };

  const disconnection = () => {
    socket.emit("bye");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      toast({
        title: "Successful connection !",
        position: "top-right",
        description: `Welcome ${username} 👋🏻`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    });

    socket.on("connect_error", (err) => {
      switch (err.message) {
        case "username already used !":
          toast({
            title: "Login error",
            position: "top-right",
            description: err.message,
            status: "warning",
            duration: 6000,
            isClosable: true,
          });

          break;

        default:
          toast({
            title: "Connect error",
            position: "top-right",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          break;
      }
      socket.disconnect();
    });

    socket.on("othersUserConnected", (data) => {
      if (data) setOtherUserLogged(data);
    });

    //notify new user
    socket.on("user connected", (data) => {
      if (data && !otherUserLogged.includes(data))
        setOtherUserLogged((others) => [...others, data]);
    });

    socket.on("private message", (data: IMessage) => {
      const newNotif = notification.find((n) => n.userID === data.from);
      if (!userSelected || userSelected!.userID !== data.from) {
        if (newNotif) {
          newNotif.count += 1;
          setNotification((n) => [...n, newNotif]);
        } else {
          setNotification((n) => [...n, { userID: data.from, count: 1 }]);
        }
      }
      setMessage((old) => [...old, data]);
    });

    socket.on("user disconnected", (data) => {
      const others = otherUserLogged.filter((user) => user.userID !== data);
      if (otherUserLogged.length < 1) setUserSelected(undefined);
      setOtherUserLogged(others);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setUserSelected(undefined);
      setUsername("");
      setMessage([]);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("othersUserConnected");
      socket.off("private message");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("disconnect");
    };
  });

  return (
    <div className="p-5  min-h-screen">
      <h1 className="text-center text-indigo-600 drop-shadow-lg font-bold text-4xl">
        Chat box
      </h1>

      <div className="mt-20 ml-[20%] mr-[20%]">
        <div className=" mt-10">
          <InputLogin
            placeholder="username"
            username={username}
            setUsername={setUsername}
            loggin={log}
            condition={isConnected}
          />
        </div>

        {/* Chatbox */}
        <div className=" mt-10 grid grid-cols-12 gap-4">
          <div className=" col-span-3">
            <InfoUser
              userlog={
                <UserLogged
                  condition={isConnected}
                  username={username}
                  action={disconnection}
                />
              }
              users={otherUserLogged}
              action={setUserSelected}
              condition={isConnected}
              notif={notification}
              setNotif={setNotification}
            />
          </div>

          <ChatBox
            messages={message}
            userSelected={userSelected}
            userId={socket.id}
            textValue={inputMessage}
            setTextValue={setInputMessage}
            action={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
