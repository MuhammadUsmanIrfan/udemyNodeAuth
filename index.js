import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

const DIARY = {};
const EMAILS = new Set();

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (EMAILS.has(email)) {
    res.status(400).json({ error: "Bad email" });
  }

  const token = `${Date.now()}`;
  DIARY[token] = { name, email, password };
  EMAILS.add(email);

  res.status(201).json({
    status: "success",
    token,
  });
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
