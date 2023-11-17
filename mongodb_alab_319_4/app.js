import express from "express";

const PORT = 4000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Starting express mongodb app...");
});

app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});
  
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});