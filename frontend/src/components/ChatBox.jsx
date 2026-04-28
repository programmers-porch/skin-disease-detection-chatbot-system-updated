import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import ResultCard from "./ResultCard";
import { sendMessage } from "../api";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { text: "Hello! Please describe your symptoms.", sender: "bot" }
  ]);

  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setLoading(true);

    try {
      console.log("Sending:", text);

      const res = await sendMessage(text);

      console.log("Response:", res.data);

      setMessages((prev) => [
        ...prev,
        {
          type: "result",
          disease: res.data.disease,
          confidence: res.data.confidence,
          advice: res.data.advice,
          sender: "bot"
        }
      ]);
    } catch (error) {
      console.error("ERROR:", error);

      setMessages((prev) => [
        ...prev,
        { text: "Server error. Please try again.", sender: "bot" }
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col flex-1 bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) =>
          msg.type === "result" ? (
            <div key={i} className="flex justify-start mb-3">
              <ResultCard
                disease={msg.disease}
                confidence={msg.confidence}
                advice={msg.advice}
              />
            </div>
          ) : (
            <MessageBubble key={i} text={msg.text} sender={msg.sender} />
          )
        )}

        {loading && (
          <MessageBubble text="Analyzing symptoms..." sender="bot" />
        )}

        <div ref={bottomRef} />
      </div>

      <InputBox onSend={handleSend} />
    </div>
  );
}