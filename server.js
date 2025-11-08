import TelegramBot from "node-telegram-bot-api";
import express from "express";

// ====== CONFIG ======
const token = process.env.TELEGRAM_BOT_TOKEN;

// polling: true -> bot avtomatik işləyəcək
const bot = new TelegramBot(token, { polling: true });

// express sadəcə Render üçün “canlıyam” demək üçündür
const app = express();
app.get("/", (_, res) => res.send("✅ Agent Brat Mini Telegram Server çalışır"));
app.listen(process.env.PORT || 3000);

// ====== BOT LOGIKA ======
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "Səni eşidirəm, Zahid Brat 👂 — burdayam. Sadəcə danış, mən cavab verim."
  );
});
