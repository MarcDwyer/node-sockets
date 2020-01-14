import {
  BODYCHANGE,
  INITDATA,
  WSBODYCHANGE,
  POSTCHANGE,
  ROOMCHANGE,
  PROJECTDATA
} from "../shared-vars";

export type Payload = {
  type: string;
  payload: any;
};
type MockData = {
  room_id: string;
  title: string;
  body: string;
  author: string;
};
export interface PayloadWS {
  type: string;
  payload: {
    room_id: string;
    prevData?: {
      prev_room_id: string;
    };
  };
}
export type State = {
  project_data: { [project_id: string]: MockData } | null;
  selected_post: string | null;
  socket: WebSocket;
};
function reducer(state: State, { payload, type }: Payload) {
  switch (type) {
    case INITDATA:
      return { ...state, project_data: payload };
    case POSTCHANGE:
      const data: PayloadWS = {
        payload: {
          prevData: state.selected_post
            ? { prev_room_id: state.selected_post }
            : undefined,
          room_id: payload
        },
        type: ROOMCHANGE
      };
      state.socket.send(JSON.stringify(data));
      return { ...state, selected_post: payload };
    case PROJECTDATA:
      const shallow = { ...state };
      if (shallow.project_data) {
        shallow.project_data[payload.room_id] = payload;
      }
      return { ...state, ...shallow };
    default:
      return state;
  }
}

export default reducer;
