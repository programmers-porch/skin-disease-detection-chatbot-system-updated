export default function MessageBubble({ text, sender }) {
  const isUser = sender === "user";

  return (
    <div className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-xs ${
          isUser ? "bg-blue-500 text-white" : "bg-white border"
        }`}
      >
        {text}
      </div>
    </div>
  );
}