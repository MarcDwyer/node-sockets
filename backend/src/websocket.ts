import WebSocket from "ws";

export const getWebSocket = async () => {
  let websocket: WebSocket;
  const wsPromise = () => {
    return new Promise(resolve => {
      const wss = new WebSocket.Server({ port: 5000 });
      wss.on("connection", ws => {
        websocket = ws;
        resolve();
      });
    });
  };
  await wsPromise();
  return websocket;
};
