// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Rule-based chatbot knowledge
// const knowledge = {
//   hello: "Hi! How can I help you?",
//   "your name": "I am your chatbot assistant.",
//   javascript: "JavaScript is a programming language for web development.",
//   mern: "MERN stands for MongoDB, Express, React, Node.js.",
//   node: "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
// };

// app.post("/chat", (req, res) => {
//   const userMsg = req.body.message.toLowerCase();
//   let reply = "Sorry, I don't understand!";

//   for (let key in knowledge) {
//     if (userMsg.includes(key)) {
//       reply = knowledge[key];
//       break;
//     }
//   }

//   res.json({ reply });
// });

// app.listen(5000, () => console.log("Chatbot backend running on port 5000"));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are a helpful chatbot." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    console.log("API:", data);

    const reply = data?.choices?.[0]?.message?.content || "No response";

    res.json({ reply });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
