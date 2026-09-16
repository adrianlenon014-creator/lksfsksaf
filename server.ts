import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const whopApiKey = process.env.WHOP_API_KEY || process.env.WHOPS_API_KEY;

  app.use(express.json());
  app.use(cors());

  // Payment API Endpoint for Whops.com
  app.post("/api/checkout", async (req, res) => {
    try {
      const { items, email } = req.body;
      if (!whopApiKey) {
        return res.status(400).json({ 
          error: "Payment processing is not configured. Add WHOP_API_KEY to the Render environment and redeploy." 
        });
      }

      if (!Array.isArray(items) || items.length === 0 || !email) {
        return res.status(400).json({ error: "A valid email and at least one item are required." });
      }

      const invalidItem = items.find((item) =>
        typeof item?.title !== 'string' ||
        typeof item?.price !== 'number' ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        !Number.isInteger(item.quantity || 1) ||
        (item.quantity || 1) < 1
      );

      if (invalidItem) {
        return res.status(400).json({ error: "One or more checkout items are invalid." });
      }

      // Prepare payload for Whop checkout API
      const whopPayload = {
        line_items: items.map((item: any) => ({
          name: item.title,
          price: Math.round(item.price * 100),
          quantity: item.quantity || 1,
        })),
        customer_email: email,
        success_url: `${req.headers.origin || 'http://localhost:3000'}/dashboard?payment=success`,
        cancel_url: `${req.headers.origin || 'http://localhost:3000'}/?payment=canceled`
      };

      // Simulated integration since Whop doesn't have a direct matching Node.js SDK
      // In a real environment, you'd fetch('https://api.whop.com/v2/checkout/sessions', ...)
      const response = await fetch('https://api.whop.com/v2/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${whopApiKey}`
        },
        body: JSON.stringify(whopPayload)
      });

      if (!response.ok) {
        const providerError = await response.text();
        console.error('Whop API response not OK:', providerError);
        return res.status(502).json({ error: "The payment provider could not create a checkout session." });
      }

      const session = await response.json();
      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Whops API Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
