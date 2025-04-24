import { app } from "..";
import { config } from "dotenv";
config();

const port: string | undefined = process.env.PORT;

app.listen(port, () => console.log(`App is running in port ${port}`));
