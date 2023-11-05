import "dotenv/config";
import { app } from "./app";

const PORT = process.env.PORT ?? 3333;

app.listen({
    port: 3333
}).then(() => {
    console.log(`app runnig on http://localhost:${PORT}/`)
})