import { RenderAPI } from "./render.js";

export async function controller(req) {
  const apiKey = process.env.RENDER_API_KEY;
  const render = new RenderAPI(apiKey);

  if (req.action === "list") {
    return await render.listServices();
  }

  if (req.action === "get") {
    return await render.getService(req.id);
  }

  if (req.action === "deploy") {
    return await render.deploy(req.id);
  }

  return { error: "Unknown action" };
}￼Enter
