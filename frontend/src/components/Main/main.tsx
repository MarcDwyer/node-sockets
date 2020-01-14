import React, { useState, useEffect, useReducer } from "react";
import MyReducer, { State, Payload } from "../../reducer/reducer";
import { POSTCHANGE } from "../../shared-vars";

const Main = () => {
  const [state, dispatch] = useReducer<React.Reducer<State, Payload>>(
    MyReducer,
    {
      project_data: null,
      selected_post: null,
      socket: new WebSocket(`ws://${document.location.hostname}:5000`)
    }
  );
  const { project_data, socket, selected_post } = state;
  useEffect(() => {
    socket.addEventListener("message", ({ data }) =>
      dispatch(JSON.parse(data))
    );
  }, []);
  console.log(state);
  return (
    <div className="app">
      {project_data &&
        Object.entries(project_data).map(([k, p]) => {
          return (
            <div className="flexme" key={k}>
              <button
                onClick={() => dispatch({ type: POSTCHANGE, payload: k })}
              >
                {p.title}
              </button>
            </div>
          );
        })}
      {project_data && selected_post && (
        <textarea
          id=""
          cols={30}
          rows={10}
          value={project_data[selected_post].body}
          onChange={e => {}}
        />
      )}
    </div>
  );
};

export default Main;
