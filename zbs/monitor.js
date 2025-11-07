// ZBS Monitor Module
// This module sends a heartbeat every 10 minutes.

// Heartbeat function
function heartbeat() {
    const now = new Date().toISOString();
    console.log(`[ZBS] Heartbeat - System alive (${now})`);
}

// 10 minute interval (600,000 ms)
setInterval(heartbeat, 600000);

// Run once on startup
heartbeat();
