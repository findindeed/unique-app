import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact Form Submission:", { name, email, message });
    // In a real app, send email or save to DB
    res.json({ success: true, message: "Thank you for contacting us. We will get back to you soon." });
  });

  app.post("/api/quote", (req, res) => {
    const { name, email, phone, message } = req.body;
    console.log("Quote Request Submission:", { name, email, phone, message });
    // In a real app, send email or save to DB
    res.json({ success: true, message: "Quote request received successfully." });
  });

  app.get("/api/products", (req, res) => {
    const products = [
      {
        id: "double-header-napkin",
        name: "Double Header Tissue Napkin Machine",
        model: "FLY_33/40",
        description: "High-speed machine designed for precision and durability. 700 sheets per minute capacity.",
        features: ["700 Sheets/Min", "4 Color Flexo Printing", "24ft x 6 x 6 Dimension", "Double Header"],
        image: "https://storage.googleapis.com/demo-files/unique-paper/double-header.png" // Placeholder for actual extraction if possible, but I will use the screenshot URLs provided in the prompt context if I can map them.
      },
      {
        id: "single-embossing-napkin",
        name: "Single Embossing Tissue Napkin Machine",
        model: "FLY_300",
        description: "Cost-effective solution for small to medium scale industries seeking high-quality output.",
        features: ["700 Sheets/Min", "Single Color Printing", "18ft x 4 x 6 Dimension", "Easy to Operate"],
        image: "https://storage.googleapis.com/demo-files/unique-paper/single-embossing.png"
      },
      // ... I will use the actual screenshot URLs from the environment if they were provided as variables, 
      // but since they are "input_file_X.png" in the prompt description, I will use them directly.
    ];
    // Re-writing the whole block with the correct screenshot URLs
    const realProducts = [
      {
        id: "double-header-napkin",
        name: "Double Header Tissue Napkin Machine",
        model: "FLY_33/40",
        description: "High-speed machine designed for precision and durability. 700 sheets per minute capacity.",
        features: ["700 Sheets/Min", "4 Color Flexo Printing", "24ft x 6 x 6 Dimension", "Double Header"],
        image: "/input_file_3.png"
      },
      {
        id: "single-embossing-napkin",
        name: "Single Embossing Tissue Napkin Machine",
        model: "FLY_300",
        description: "Cost-effective solution for small to medium scale industries seeking high-quality output.",
        features: ["700 Sheets/Min", "Single Color Printing", "18ft x 4 x 6 Dimension", "Easy to Operate"],
        image: "/input_file_5.png"
      },
      {
        id: "double-decker-napkin",
        name: "Double Decker Paper Napkin Machine",
        model: "FLY_1200",
        description: "Designed for high-speed production and maximum efficiency. Ideal for scaling up manufacturing.",
        features: ["1200 Sheets/Min", "Single Color Printing", "Double Decker Design", "High Production"],
        image: "/input_file_7.png"
      },
      {
        id: "semi-auto-toilet-roll",
        name: "Semi-Automatic Toilet Roll Machine",
        model: "FLY_800",
        description: "Cost-effective solution for producing high-quality toilet rolls with ease.",
        features: ["8000 Rolls / 8 Hrs", "800mm Working Width", "PLC Controller", "Low Investment"],
        image: "/input_file_9.png"
      },
      {
        id: "fully-auto-toilet-roll",
        name: "Fully Automatic Toilet Roll Machine",
        model: "FLY_1450",
        description: "State-of-the-art solution for high-speed, precise, and efficient toilet roll production.",
        features: ["15000 Rolls / 8 Hrs", "Automatic Core Loading", "Tail Sealing", "High Production"],
        image: "/input_file_11.png"
      },
      {
        id: "l-fold-dispenser",
        name: "L-Fold Cube Napkin Dispenser Machine",
        model: "FLY_-650",
        description: "Precision production of cube napkins, delivering up to 600 tissues per minute.",
        features: ["600 Tissues/Min", "Manual Sealing Attachment", "Perfect Folding", "High Demand"],
        image: "/input_file_15.png"
      },
      {
        id: "foil-rewinding",
        name: "Aluminum Foil Rewinding Machine",
        description: "High-performance solution for precise rewinding of industrial stretch films and foil.",
        features: ["Precise Rewinding", "User-friendly Controls", "Continuous Production", "Speed & Accuracy"],
        image: "/input_file_17.png"
      },
      {
        id: "three-color-flexo",
        name: "Three Colour Flexo Printing Paper Napkin Machine",
        description: "Advanced flexographic printing technology with a double embossing system for premium quality napkins.",
        features: ["3 Color Printing", "Double Embossing", "High-speed Production", "Unmatched Consistency"],
        image: "/input_file_13.png"
      },
      {
        id: "automatic-sealing",
        name: "Fully Automatic Sealing Machine",
        description: "Hygienic packing solutions for paper napkins of different sizes and designs.",
        features: ["Fast & Precise", "Advanced Sealing Tech", "Hygienic Packing", "Market Ready"],
        image: "/input_file_18.png"
      }
    ];
    res.json(realProducts);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
