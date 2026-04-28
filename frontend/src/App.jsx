import Header from "./components/Header";
import ChatBox from "./components/ChatBox";

export default function App() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-green-100 to-gray-100">
      <div className="w-[420px] h-[650px] bg-white rounded-2xl shadow-xl flex flex-col">
        <Header />
        <ChatBox />
      </div>
    </div>
  );
}