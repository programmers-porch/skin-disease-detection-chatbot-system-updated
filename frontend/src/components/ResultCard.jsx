export default function ResultCard({ disease, confidence, advice }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-80">
      <h2 className="text-lg font-bold text-blue-600">{disease}</h2>
      <p className="text-sm text-gray-600 mt-1">
        Confidence: {(confidence * 100).toFixed(0)}%
      </p>
      <p className="mt-2 text-gray-700">{advice}</p>
    </div>
  );
}