export const config = {
  runtime: 'edge',
};

import { Hono } from "hono";
import { handle } from 'hono/vercel';
import tmdbScrape from "../src/vidsrc";

const app = new Hono()

// Middleware to set CORS headers
app.use('*', (c, next) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});

app.get('/', (c) => {
  return c.json({ message: "Congrats! Api working :)" });
});

app.get("/:id/:ss?/:ep?", async (c) => {
  const { id, ss, ep } = c.req.param();
  const results = (!ss && !ep) ? await tmdbScrape(id, "movie") : await tmdbScrape(id, "tv", Number(ss), Number(ep));
  return c.json(results);
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
