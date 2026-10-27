import express from "express";
import bcrypt from "bcryptjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB } from "./db.js";
import User from "./models/User.js";

const app = express();
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Smart Kirana API is running" });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const username = typeof req.body?.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (username.length < 3 || username.length > 40 || password.length < 8 || password.length > 72) {
      return res.status(400).json({ message: "Username 3–40 characters aur password 8–72 characters ka hona chahiye." });
    }
    await connectDB();
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ message: "Ye username pehle se registered hai." });
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ username, password: hashedPassword });
    return res.status(201).json({ message: "Registration successful. Ab login kar sakte hain." });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ message: "Ye username pehle se registered hai." });
    console.error("Register error:", error.message);
    return res.status(500).json({ message: "Registration nahi ho paya. Database connection check karein." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const username = typeof req.body?.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!username || !password) return res.status(400).json({ message: "Username aur password required hain." });
    await connectDB();
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Username ya password galat hai." });
    }
    // This starter intentionally does not issue a persistent auth token yet.
    return res.json({ message: "Login successful", user: { username: user.username } });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Login nahi ho paya. Database connection check karein." });
  }
});

export default app;
