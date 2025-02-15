import App from "./App";

const main = async () => {
  const app = new App();
  try {
    app.start(3001);
  } catch(e) {
    console.log(e);
  }
}

main();
