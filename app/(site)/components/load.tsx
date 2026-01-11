"use client"
export default function LoadPage() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex space-x-3">
        <span className="w-3 h-3 rounded-full bg-green-500 animate-bounceDot"></span>
        <span className="w-3 h-3 rounded-full bg-green-500 animate-bounceDot delay-150"></span>
        <span className="w-3 h-3 rounded-full bg-green-500 animate-bounceDot delay-300"></span>
      </div>

      <style jsx>{`
        @keyframes bounceDot {
          0%, 80%, 100% { transform: scale(0); background-color: #22c55e; }
          40% { transform: scale(1); background-color: #22c55e; }
        }

        .animate-bounceDot {
          animation: bounceDot 0.6s infinite ease-in-out;
        }

        .delay-150 {
          animation-delay: 0.15s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}