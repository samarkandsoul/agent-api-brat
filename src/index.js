import Fastify from "fastify";
import { Telegraf } from "telegraf";

const fastify = Fastify({ logger: true });

// BOT TOKEN (Replit / Render environment-dan gəlir)
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN tapılmadı!");
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// Sadə test komandası
bot.command("start", (ctx) => ctx.reply("Brat, sistem aktivdir ✅"));

// Webhook route
fastify.post("/api/telegram/webhook", async (req, reply) => {
  try {
    await bot.handleUpdate(req.body);
    reply.send({ ok: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    reply.send({ ok: false });
  }
});

// Health check
fastify.get("/", async () => {
  return { status: "Agent API Brat is running ✅" };
});

// Serveri işə sal
fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" })
  .then(() => console.log("✅ Server işə düşdü"))
  .catch((err) => console.error(err));
