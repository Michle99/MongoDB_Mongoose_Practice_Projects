import express from "express";
import grades from "./routes/grades.js";
import learner from "./routes/learner.js"

const PORT = 4000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Starting express mongodb app...");
});

app.use("/grades", grades);
app.use("/grades/learner", learner);

app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});
  
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});