import React, { useState, useEffect, useReducer } from "react";
import { MockData } from "./data-types/data";
import MyReducer, { Payload, State } from "./reducer/reducer";
import "./App.css";
import { BODYCHANGE } from "./shared-vars";

const App: React.FC = () => {
  const [{ socket, mockData }, dispatch] = useReducer<
    React.Reducer<State, Payload>
  >(MyReducer, {
    socket: new WebSocket(`ws://${document.location.hostname}:5000`),
    mockData: null
  });
  useEffect(() => {
    socket.addEventListener("message", ({ data }: any) => {
      const parsed = JSON.parse(data);
      console.log(parsed);
      dispatch(parsed);
    });
  }, []);
  return (
    <div>
      {mockData && (
        <textarea
          name="main"
          id=""
          cols={130}
          rows={75}
          value={mockData.body}
          onChange={e => {
            dispatch({ type: BODYCHANGE, payload: e.target.value });
            console.log(e.target.value);
            socket.send(
              JSON.stringify({ type: BODYCHANGE, payload: e.target.value })
            );
          }}
        />
      )}
    </div>
  );
};

export default App;
