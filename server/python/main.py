from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import google.generativeai as genai
import uvicorn

# ================================
# Config
# ================================
genai.configure(api_key="AIzaSyBk0Q8pFNbAgl3KkZybrhqtD8M2ZmuF8e8")
model = genai.GenerativeModel("gemini-2.5-pro")

# ================================
# Financial Agent Prompt (Short, Context-Aware)
# ================================
FINANCIAL_AGENT_PROMPT = """
You are a highly skilled financial assistant for a Finance Tracker application.
Your role:
- Help users understand their income, expenses, savings, and investments.
- Provide short, concise, actionable advice.
- Maintain context of previous messages in the conversation.
- Always respond politely and clearly.
- If the query is not finance-related, gently redirect the user back to finance topics.
Respond in plain text, no greetings, no Markdown symbols, and keep answers brief.
"""

# ================================
# FastAPI App
# ================================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================================
# In-memory session storage for conversation history
# ================================
# key: session_id (or user_id), value: list of dicts: {"role": "user"/"assistant", "content": "..."}
conversation_history = {}

# ================================
# Routes
# ================================
@app.get("/")
def root():
    return {"status": "ok", "message": "Chatbot backend running with Gemini (Financial Agent, context-aware)!"}

@app.post("/chat")
async def chat(request: Request):
    try:
        body = await request.json()
        session_id = body.get("session_id", "default")  # allow multiple sessions
        user_message = body.get("message", "").strip()

        if not user_message:
            return JSONResponse({"error": "Message field is required"}, status_code=400)

        # Initialize conversation history if not exists
        if session_id not in conversation_history:
            conversation_history[session_id] = []

        # Append user message to history
        conversation_history[session_id].append({"role": "user", "content": user_message})

        # Build prompt with context
        context_messages = ""
        for msg in conversation_history[session_id][-6:]:  # limit last 6 messages for brevity
            prefix = "User:" if msg["role"] == "user" else "Assistant:"
            context_messages += f"{prefix} {msg['content']}\n"

        full_prompt = f"{FINANCIAL_AGENT_PROMPT}\n\n{context_messages}Assistant:"

        # Generate response
        response = model.generate_content(full_prompt)
        reply = (response.text or "").strip()

        # Append assistant response to history
        conversation_history[session_id].append({"role": "assistant", "content": reply})

        return {"user": user_message, "reply": reply}

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
