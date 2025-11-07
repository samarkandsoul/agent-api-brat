// ZBS Healthcheck Module
// This module checks the health of core external services.

const fetch = require("node-fetch");

// -----------------------------
// GitHub API Check
// -----------------------------
async function checkGitHub() {
    try {
        const response = await fetch("https://api.github.com", {
            headers: { "User-Agent": "ZBS-System" }
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with: ${response.status}`);
        }

        return { service: "GitHub", status: "OK" };
    } catch (error) {
        return { service: "GitHub", status: "ERROR", error: error.message };
    }
}

// -----------------------------
// Render API Check (REAL)
// -----------------------------
async function checkRender() {
    try {
        const response = await fetch("https://api.render.com/health");

        if (!response.ok) {
            throw new Error(`Render API status: ${response.status}`);
        }

        return { service: "Render", status: "OK" };
    } catch (error) {
        return { service: "Render", status: "ERROR", error: error.message };
    }
}

// -----------------------------
// Google Drive API Check (placeholder for now)
// -----------------------------
async function checkGoogle() {
    try {
        // TODO: Add Google Drive API request later
        return { service: "Google Drive", status: "OK" };
    } catch (error) {
        return { service: "Google Drive", status: "ERROR", error: error.message };
    }
}

// -----------------------------
// Telegram Bot API Check (placeholder for now)
// -----------------------------
async function checkTelegram() {
    try {
        // TODO: Add Telegram API request later
        return { service: "Telegram", status: "OK" };
    } catch (error) {
        return { service: "Telegram", status: "ERROR", error: error.message };
    }
}

// -----------------------------
// Main healthcheck runner
// -----------------------------
async function runHealthcheck() {
    const results = [];

    results.push(await checkGitHub());
    results.push(await checkRender());
    results.push(await checkGoogle());
    results.push(await checkTelegram());

    console.log("[ZBS] Healthcheck Results:", results);
}

module.exports = { runHealthcheck };
