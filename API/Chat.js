export default async function handler(req, res) {
    const { messageText } = req.body;
    // Check if the app was in temp mode when this message was sent
    const isTemp = req.headers['x-temp-mode'] === 'true';

    try {
        // 1. Get the AI response from Groq
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are Lightning AI, a helpful and lightning-fast assistant." },
                    { role: "user", content: messageText }
                ]
            })
        });

        const data = await response.json();
        const aiResponseText = data.choices[0].message.content;

        // 2. SAVE TO SUPABASE
        // We use the environment variables we will set in Vercel
        await fetch(`${process.env.SUPABASE_URL}/rest/v1/chat_history`, {
            method: 'POST',
            headers: {
                'apikey': process.env.SUPABASE_KEY,
                'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                user_message: messageText,
                ai_response: aiResponseText,
                is_temp: isTemp
            })
        });

        // 3. Send the AI response back to your website
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: "Failed to process chat" });
    }
                                 }
