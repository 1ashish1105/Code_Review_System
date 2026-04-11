# 📜 The Master Project Explainer (Everything in One Place)

This is your complete guide to the **AI Code Reviewer**. It contains all the code and a detailed explanation for every single part. 

---

## 🏗️ Part 1: The Backend (The Brains)

### 1. The Starter Motor (`backend/server.js`)
This is the file that launches the server. Without this, nothing else works.

```javascript
/* LINE 1 */ import 'dotenv/config'; 
// Translation: Reads the secret .env file and puts your API keys into memory.

/* LINE 2 */ import app from './src/app.js';
// Translation: Imports the 'Management' logic from the app.js file.

/* LINE 4 */ const PORT = 3001; 
// Translation: Decides that the backend will live at address number 3001.

/* LINE 6 */ app.listen(PORT, () => {
/* LINE 7 */     console.log(`Server running on port ${PORT}`);
/* LINE 8 */ });
// Translation: This starts the server. It's like turning on the "Open" sign for a shop.
```

---

### 2. The Receptionist (`backend/src/app.js`)
This file handles the logic for who is allowed to talk to the server and what language they speak.

```javascript
/* LINE 1 */ import express from 'express'; 
// Translation: Imports the main tool for building servers.

/* LINE 2 */ import cors from 'cors'; 
// Translation: A security tool. It tells the server: "It's okay to talk to my Frontend on port 5173!"

/* LINE 3 */ import aiRoutes from './routes/ai.routes.js';
// Translation: Imports the "Street Map" for all AI-related requests.

/* LINE 5 */ const app = express();
// Translation: Creates the actual server object.

/* LINE 7 */ app.use(cors()); 
// Translation: Activates the security badge (CORS).

/* LINE 8 */ app.use(express.json()); 
// Translation: Teaches the server to read JSON (the format for sending text/data).

/* LINE 10 */ app.use('/ai', aiRoutes);
// Translation: Any address starting with '/ai' (like /ai/get-review) will be handled by our AI route file.

/* LINE 12 */ export default app;
// Translation: Shares this server logic with server.js.
```

---

### 3. The Traffic Controller (`backend/src/routes/ai.routes.js`)
This file maps specific URLs to specific actions.

```javascript
/* LINE 1 */ import express from 'express'; 
/* LINE 2 */ const router = express.Router(); 
/* LINE 3 */ import * as aiController from "../controllers/ai.controller.js";

/* LINE 5 */ router.post('/get-review', aiController.getReview); 
// Translation: "If a user sends a POST request (data delivery) to /get-review, call the getReview function."

/* LINE 7 */ export default router;
```

---

### 4. The Dispatcher (`backend/src/controllers/ai.controller.js`)
This file "opens the mail" from the user and hands it to the AI Expert.

```javascript
/* LINE 1 */ import { generateContent } from "../services/ai.service.js";

/* LINE 3 */ export const getReview = async (req, res) => { 
// Translation: 'req' is the incoming Request (mail). 'res' is the outgoing Response (reply).

/* LINE 5 */     const code = req.body.code; 
// Translation: Grabs the code text from inside the 'body' of the request.

/* LINE 7 */     if (!code) { 
/* LINE 8 */         return res.status(400).send("No code provided.");
/* LINE 9 */     }

/* LINE 11 */    const response = await generateContent(code); 
// Translation: Asks the AI Expert to review the code. 'await' means we pause until it answers.

/* LINE 13 */    res.send(response); 
// Translation: Sends the AI's final answer back to the user's browser.
};
```

---

### 5. The AI Expert (`backend/src/services/ai.service.js`)
This is the "Brain" that speaks to Google Gemini.

```javascript
/* THE LOGIC BREAKDOWN */
// We use a "For-Loop" and a "Try-Catch" block.
// 1. We list the model names: ["gemini-flash-latest", "gemini-pro-latest"].
// 2. We try the first model name.
// 3. If it fails (Not Found/Quota error), the 'catch' block triggers.
// 4. Instead of crashing, it 'continues' to the next name in the list.
// 5. If it works, it 'returns' the result and the function ends.
```

---

## 🎨 Part 2: The Frontend (The Shop Front)

### 6. The User Interface (`frontend/src/App.jsx`)
How the React website lives and breathes.

```javascript
/* KEY LOGIC */
// 1. useState(code): Holds whatever you type in the box.
// 2. setCode(e.target.value): Every time you type a letter, React updates its memory.
// 3. reviewCode(): This is the function triggered by the button.
//    - It uses axios.post to send the code to port 3001.
//    - It waits for the answer.
//    - It saves the answer into the 'review' state so it appears on the right side of the screen.
```

---

## 🔗 How it all connects: The "Handshake"

1.  **React App** (Port 5173) sends a JSON envelope ✉️ to Port 3001.
2.  **Express Server** (Port 3001) receives it, reads it, and calls Gemini AI 🤖.
3.  **Gemini AI** sends the review back to the Express Server 📋.
4.  **Express Server** sends that same review back to the React App 💻.
5.  **React App** updates its memory (`setReview`) and the screen changes!

---
**Does this single-page guide make you feel like you've mastered the project? If you want more details on any specific line, just name the line number!**
