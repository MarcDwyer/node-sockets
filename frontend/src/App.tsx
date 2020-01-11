import React, { useState, useEffect } from "react";
import "./App.css";

const useSocket = (url: string): WebSocket | null => {
  console.log(url);
  const [socket, setSocket] = useState<null | WebSocket>(null);
  useEffect(() => {
    setSocket(new WebSocket(url));
  }, [url]);
  return socket;
};
const App: React.FC = () => {
  const url = `ws://${document.location.hostname}:5000`;
  const socket = useSocket(url);

  useEffect(() => {
    if (socket) {
      socket.onopen = function(e) {
        console.log(e);
      };
      socket.addEventListener("message", ({ data }) => {
        console.log(data);
      });
      setTimeout(
        () => socket.send("Yo bro papa bless from the frontend"),
        5500
      );
    }
  });
  return (
    <div>
      <span>hello</span>
    </div>
  );
};

export default App;
