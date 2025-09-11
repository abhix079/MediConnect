import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import socket from "../../socket";
import styles from "../styles/ChatWidget.module.css";

export default function ChatWidget({ role, name }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit("join", { role, name });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [role, name]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const msg = { sender: name, role, text: input };
      socket.emit("sendMessage", msg);
      setInput("");
    }
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)} className={styles.chatFloatBtn}>
        <MessageCircle size={24} />
      </button>

      {open && (
        <div className={styles.chatBox}>
          <h3 className={styles.chatTitle}>Team Chat</h3>
          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.chatMessage} ${
                  msg.sender === name ? styles.sent : styles.received
                }`}
              >
                <div className={styles.chatText}>{msg.text}</div>
                <div className={styles.chatSender}>{msg.sender}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className={styles.chatInputContainer}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className={styles.chatInput}
            />
            <button onClick={sendMessage} className={styles.chatSendBtn}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
