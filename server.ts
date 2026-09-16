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
  const whopAccountId = process.env.WHOP_ACCOUNT_ID;

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

      if (!whopAccountId) {
        return res.status(400).json({
          error: "Payment processing needs WHOP_ACCOUNT_ID. Add your biz_ account ID to Render and redeploy."
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

      const total = items.reduce((sum: number, item: any) => sum + item.price * (item.quantity || 1), 0);
      const returnUrl = `${process.env.APP_URL || req.headers.origin || 'http://localhost:3000'}/dashboard?payment=success`;

      // Whop checkout configurations use an inline one-time plan for this cart.
      const whopPayload = {
        account_id: whopAccountId,
        plan: {
          initial_price: total,
          plan_type: 'one_time',
          title: items.length === 1 ? items[0].title : `Emtech Developers order (${items.length} items)`,
          currency: 'usd',
        },
        redirect_url: returnUrl,
        metadata: {
          customer_email: email,
        },
      };

      const response = await fetch('https://api.whop.com/api/v1/checkout_configurations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${whopApiKey}`,
          'Api-Version-Date': '2026-09-15',
        },
        body: JSON.stringify(whopPayload)
      });

      if (!response.ok) {
        const providerError = await response.text();
        console.error('Whop API response not OK:', providerError);
        let message = "The payment provider could not create a checkout session.";
        try {
          const parsedError = JSON.parse(providerError);
          message = parsedError.error?.message || message;
        } catch {
          // Keep provider HTML or non-JSON responses out of the client response.
        }
        return res.status(502).json({ error: message });
      }

      const session = await response.json();
      res.json({ url: session.purchase_url });
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
