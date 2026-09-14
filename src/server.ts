import app from "./app.js";
import { migrate } from "./shared/orm.js";

await migrate();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});