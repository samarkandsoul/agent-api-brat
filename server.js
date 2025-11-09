import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ENV-dən dəyişənləri oxuma
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;

// Shopify API əsas URL
const SHOPIFY_API_BASE = `https://${SHOPIFY_STORE_URL}/admin/api/2024-01`;

// Test üçün — mağazadakı məhsulları çəkmək
app.get("/products", async (req, res) => {
  try {
    const response = await fetch(
      `${SHOPIFY_API_BASE}/products.json`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("Agent Brat Shopify çalışır ✅");
});

// Serveri işə sal
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server çalışır PORT:", PORT);
});
