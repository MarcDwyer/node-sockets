import { MockData } from "../data-types/data";
import { BODYCHANGE, INITDATA, WSBODYCHANGE } from "../shared-vars";
export type Payload = {
  type: string;
  payload: any;
};
export type State = {
  mockData: MockData | null;
  socket: WebSocket;
};
function reducer(state: State, { payload, type }: Payload) {
  switch (type) {
    case INITDATA:
      return { ...state, mockData: payload };
    case BODYCHANGE:
      if (state.mockData) {
        const shallow: State = { ...state };
        //@ts-ignore
        shallow.mockData.body = payload;
        console.log(payload);
        return shallow;
      }
    case WSBODYCHANGE:
      console.log("yeet");
    default:
      return state;
  }
}

export default reducer;
