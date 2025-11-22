import { ChatWebLLM } from "https://esm.run/webllm";

let engine;

// Load Model
async function loadModel() {
  engine = await ChatWebLLM.create({
    model: "Llama-3.2-1B-instruct-q4f32_1-MLC",
  });
}
loadModel();

// UI Elements
const toggle = document.getElementById("chatbot-toggle");
const box = document.getElementById("chatbot-box");
const closeBtn = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("chatbot-send");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

// Toggle chat window
toggle.onclick = () => (box.style.display = "flex");
closeBtn.onclick = () => (box.style.display = "none");

// Add message to UI
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}-message`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Send message
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage("Thinking...", "bot");

  const reply = await engine.chat(text);

  // Replace the "Thinking..." message
  messages.lastChild.textContent = reply;
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
