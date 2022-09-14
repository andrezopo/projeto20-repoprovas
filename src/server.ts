import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
  console.log(`Look the server funfing there in port ${PORT}`);
});
