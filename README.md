⚡ Lightning AI

Lightning AI is a futuristic mobile-first AI chat Progressive Web App (PWA) built with a glassmorphism-inspired interface, GROQ-powered AI responses, and Supabase conversation logging.

Designed to feel like a native mobile AI operating system, Lightning AI focuses on:

Fast AI conversations

Smooth mobile UX

Temporary/private chat mode

Modern glass UI

PWA installation support

Real-time API communication



---

🚀 Features

AI Chat

GROQ-powered AI responses

Real-time streaming-like typing animation

Markdown rendering support

Mobile-optimized interface


Supabase Logging

Stores chat history

Tracks:

User message

AI response

Temp mode status

Timestamp



Temp Mode

Private temporary conversations

Automatically clears temp messages

Separate visual theme


Mobile-First Design

Native app-style layout

Floating glass navigation bar

Keyboard-friendly interface

PWA support

Safe-area support for modern phones


PWA Support

Installable on Android/iOS

Offline-ready service worker support

App icons and manifest support



---

🧠 Tech Stack

Frontend

HTML5

CSS3

Vanilla JavaScript

Lucide Icons

Marked.js


Backend

Vercel Serverless Functions

GROQ API

Supabase Database



---

📁 Project Structure

Lightning-AI/
│
├── api/
│   └── chat.js
│
├── public/
│   ├── icon.png
│   ├── manifest.json
│   └── sw.js
│
├── index.html
├── style.css
├── script.js
└── README.md


---

⚙️ Environment Variables

Add these variables inside your Vercel project settings.

GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key


---

🗄️ Supabase Table

Create a table named:

chat_history

Columns:

id
user_message
ai_response
is_temp
created_at

Example SQL:

create table chat_history (
    id bigint generated always as identity primary key,
    user_message text,
    ai_response text,
    is_temp boolean default false,
    created_at timestamp with time zone default timezone('utc', now())
);


---

🔌 API Endpoint

POST /api/chat

Request:

{
  "messageText": "Hello AI"
}

Headers:

Content-Type: application/json
x-temp-mode: true | false


---

📱 PWA Installation

Android

1. Open app in Chrome


2. Tap menu


3. Tap "Install App"



iPhone

1. Open app in Safari


2. Tap Share


3. Tap "Add to Home Screen"




---

🛠️ Local Development

Run Frontend

Open:

index.html

Run Backend

Use:

vercel dev


---

🌐 Deployment

Deploy to Vercel

1. Push project to GitHub


2. Import project into Vercel


3. Add environment variables


4. Deploy




---

🎨 UI Philosophy

Lightning AI uses a:

Minimal futuristic aesthetic

Glassmorphism UI system

Native mobile interaction style

Floating navigation architecture

Smooth transitions and animations


The app is designed to feel closer to a mobile operating system than a traditional website.


---

🔒 Privacy

Temp Mode conversations:

Are visually separated

Can be cleared automatically

Are marked in database logs



---

📌 Current Status

Lightning AI is currently focused on:

Mobile optimization

PWA stability

Keyboard behavior improvements

AI UX refinement

Faster response handling



---

👨‍💻 Author

Built by JayTech.inc.


---

⚡ Lightning AI

"Fast. Futuristic AI."
