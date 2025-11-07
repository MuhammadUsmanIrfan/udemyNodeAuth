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

app.post("/me", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "token is required" });
  if (!(token in DIARY)) return res.status(400).json({ error: "Invalid token" });

  const entry = DIARY[token];

  return res.status(200).json({ data: entry });
});

app.post("/private-data", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "token is required" });
  if (!(token in DIARY)) return res.status(400).json({ error: "Invalid token" });

  const entry = DIARY[token];

  return res.status(200).json({ privateData: "Access  Granted" });
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
