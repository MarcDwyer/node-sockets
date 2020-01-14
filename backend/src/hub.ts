import { PData } from "./main";
import WebSocket from "ws";
interface HubType {
  [room: string]: {
    [client_id: string]: WebSocket;
  };
}

export class Hub {
  private rooms: HubType;
  constructor(rooms: HubType) {
    this.rooms = rooms;
  }
  addToRoom(room_id: string, id: string, ws: WebSocket) {
    if (room_id in this.rooms) {
      this.rooms[room_id][id] = ws;
      console.log(this.rooms[room_id]);
    }
  }
  removeFromRoom(room_id: string, id: string) {
    if (id in this.rooms[room_id]) {
      delete this.rooms[room_id][id];
      console.log(this.rooms[room_id]);
    }
  }
}

export const setHub = (data: PData): Hub => {
  const rooms: HubType = {};
  for (const key in data) {
    rooms[key] = {};
  }
  return new Hub(rooms);
};
