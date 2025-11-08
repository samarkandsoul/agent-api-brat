import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { controller } from "./src/agent-controller/controller.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ========================
// PORT SETUP
// ========================
const PORT = process.env.PORT || 8080;

// ========================
// CONFIG
// ========================
const RENDER_API_URL = "https://api.render.com/v1";
const RENDER_API_KEY = process.env.RENDER_API_KEY;

const BOT_TOKEN = process.env.BOT_TOKEN;     // <--- sən Render-də əlavə edirsən
const ADMIN_CHAT = process.env.ADMIN_CHAT;   // <--- sən Render-də əlavə edirsən

// ========================
// TELEGRAM BOT
// ========================
let bot = null;

if (BOT_TOKEN) {
  bot = new TelegramBot(BOT_TOKEN, { polling: false });

  app.post("/telegram/webhook", (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🧠 Brat sistem aktivdir ✅");
  });

  bot.on("message", async (msg) => {
    const text = (msg.text || "").trim();

    if (!text || text.startsWith("/")) return;

    bot.sendMessage(msg.chat.id, "Səni eşidirəm, Zahid Brat 👂");
  });
}

// ========================
// GPT ACTION ENDPOINTS
// ========================
app.get("/services", async (_req, res) => {
  try {
    const r = await fetch(`${RENDER_API_URL}/services`, {
      headers: { Authorization: `Bearer ${RENDER_API_KEY}` },
    });
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: "Render API error" });
  }
});

app.post("/services/:id/deploy", async (req, res) => {
  try {
    const r = await fetch(`${RENDER_API_URL}/services/${req.params.id}/deploys`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RENDER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clearCache: false }),
    });
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: "Deploy API error" });
  }
});

// ========================
// AGENT CONTROLLER
// ========================
app.post("/agent-controller", async (req, res) => {
  try {
    const data = await controller(req.body);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========================
// HOME PAGE
// ========================
app.get("/", (_req, res) => {
  res.send("✅ Agent Brat Controller işləyir");
});

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});￼Enter
