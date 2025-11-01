import buildServer from "./app.js";

const server = buildServer();

const listenServer = () => {
  try {
    const PORT = process.env.PORT || 3000;
    server.listen(
      {
        port: PORT,
        host: "0.0.0.0",
      },
      () => {
        console.log(`${new Date()}`);
        console.log(`Server listen on http://localhost:${PORT}`);
      }
    );
  } catch (error) {
    console.log(`Error on listenServer ${error}`);
    process.exit(1);
  }
};
listenServer()
