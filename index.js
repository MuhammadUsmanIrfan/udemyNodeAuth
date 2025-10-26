import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

const DIARY = {};

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (email in DIARY) {
    res.status(400).json({ error: "Bad email" });
  }
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
