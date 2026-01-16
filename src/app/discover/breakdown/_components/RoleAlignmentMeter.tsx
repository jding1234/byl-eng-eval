"use client";

import { clamp } from "@/lib/math";

export function RoleAlignmentMeter({ score }: { score: number }) {
  const s = clamp(score, 0, 100);
  const left = Math.min(50, s);
  const right = Math.max(50, s);
  const width = right - left;
  const isLow = s < 50;

  const low = "#F2C9CC";
  const neutral = "#F6E2B6";
  const high = "#D6EAD8";

  // Base: split at 50 so no red influences past 50
  const leftHalf = `linear-gradient(90deg, ${low} 0%, ${neutral} 100%)`;
  const rightHalf = `linear-gradient(90deg, ${neutral} 0%, ${high} 100%)`;

  // Only round the FAR edge (not the neutral edge)
  const farEdgeRadius = 32;
  const position = score;
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Meter Container */}
      <div className="mt-4">
        {/* Labels */}
        <div className="flex justify-between items-center">
          <span className="text-lg text-gray-600">Low</span>
          <span className="text-lg text-gray-600 mb-8">Neutral</span>
          <span className="text-lg text-gray-600">High</span>
        </div>

        {/* Gradient Bar */}
        <div className="relative h-22 rounded-3xl overflow-visible">
          {/* Background gradient - full meter from red to yellow to green */}
          <div
            className="absolute -top-2 right-0 bottom-0 left-0 rounded-3xl opacity-50"
            style={{
              background:
                "linear-gradient(to right, #f5d5d5 0%, #fef5e0 50%, #d4e8d4 100%)",
            }}
          />

          {/* Progress bar from neutral (50) to current score */}
          {position !== 50 && (
            <div
              className="absolute -top-2 right-0 bottom-0 left-0 transition-all duration-500 ease-out flex items-center pr-6"
              style={{
                left: position >= 50 ? "50%" : `${position}%`,
                right: position >= 50 ? `${100 - position}%` : "50%",
                borderRadius:
                  position >= 50 ? "0 1.5rem 1.5rem 0" : "1.5rem 0 0 1.5rem",
                background:
                  "linear-gradient(to right, #e88888 0%, #f5e5a0 50%, #a0d4a0 100%)",
                backgroundSize: "100vw 100%",
                backgroundPosition:
                  position >= 50 ? `-${50}vw 0` : `-${position}vw 0`,
                justifyContent: position >= 50 ? "flex-end" : "flex-start",
                paddingLeft: position >= 50 ? "0" : "1.5rem",
                paddingRight: position >= 50 ? "1.5rem" : "0",
              }}
            >
              {/* Score indicator */}
              <div className="text-6xl font-serif text-gray-700 drop-shadow-sm">
                {score}
              </div>
            </div>
          )}

          {/* Score indicator for exactly 50 */}
          {position === 50 && (
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 ml-4">
              <div className="text-6xl font-serif text-gray-700 drop-shadow-sm">
                {score}
              </div>
            </div>
          )}

          {/* Neutral marker line */}
          <div className="absolute left-1/2 -top-8 -bottom-8 w-px bg-gray-400" />
        </div>
      </div>
    </div>
  );
}
