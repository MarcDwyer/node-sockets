import { PData } from "./main";
import WebSocket from "ws";
interface HubType {
  [room: string]: {
    [clientIP: string]: WebSocket;
  };
}

export class Hub {
  private rooms: HubType;
  constructor(rooms: HubType) {
    this.rooms = rooms;
  }
  addToRoom(room_id: string, ip: string, ws: WebSocket) {
    if (room_id in this.rooms) {
      this.rooms[room_id][ip] = ws;
    }
  }
  removeFromRoom(room_id: string, ip: string) {
    if (ip in this.rooms[room_id]) {
      delete this.rooms[room_id][ip];
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
