
import React from "react";

interface CreditScoreGaugeProps {
  score: number;
  minScore?: number;
  maxScore?: number;
  className?: string;
}

const GAUGE_RANGES = [
  { label: "POOR", min: 300, max: 579, color: "#F97316" },
  { label: "FAIR", min: 580, max: 669, color: "#FB923C" },
  { label: "GOOD", min: 670, max: 739, color: "#F59E42" },
  { label: "VERY GOOD", min: 740, max: 799, color: "#EF7E3A" },
  { label: "EXCELLENT", min: 800, max: 850, color: "#EA580C" },
];

function getGaugeAngle(score: number, minScore: number, maxScore: number) {
  // 0deg at far left, 180deg at far right
  const relScore = Math.min(Math.max(score, minScore), maxScore);
  return ((relScore - minScore) / (maxScore - minScore)) * 180;
}

export const CreditScoreGauge: React.FC<CreditScoreGaugeProps> = ({
  score,
  minScore = 300,
  maxScore = 850,
  className = "",
}) => {
  const angle = getGaugeAngle(score, minScore, maxScore);
  // Calculate pointer position
  const pointerLength = 80, pointerWidth = 7;
  const center = 100;
  const rad = (Math.PI * angle) / 180;
  const pointerX = center + pointerLength * Math.cos(Math.PI + rad);
  const pointerY = center + pointerLength * Math.sin(Math.PI + rad);

  // For dynamic coloring and ranges
  return (
    <div className={className + " w-full flex flex-col items-center"}>
      <svg width="220" height="130" viewBox="0 0 200 120">
        {/* Ranges as colored arcs */}
        {GAUGE_RANGES.map((range, idx) => {
          const startAng = ((range.min - minScore) / (maxScore - minScore)) * 180;
          const endAng = ((range.max - minScore) / (maxScore - minScore)) * 180;
          const startRad = ((startAng - 90) * Math.PI) / 180;
          const endRad = ((endAng - 90) * Math.PI) / 180;
          const r = 90;
          const x1 = 100 + r * Math.cos(startRad);
          const y1 = 100 + r * Math.sin(startRad);
          const x2 = 100 + r * Math.cos(endRad);
          const y2 = 100 + r * Math.sin(endRad);
          const largeArcFlag = endAng - startAng > 90 ? 1 : 0;
          return (
            <path
              key={range.label}
              d={`M${x1} ${y1} A${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
              stroke={range.color}
              strokeWidth="18"
              fill="none"
              style={{ opacity: 0.95 }}
            />
          );
        })}
        {/* Score labels+sections */}
        {GAUGE_RANGES.map((range, idx) => {
          const mid = (range.min + range.max) / 2;
          const midAng = ((mid - minScore) / (maxScore - minScore)) * 180 - 90;
          const rad = (midAng * Math.PI) / 180;
          const rx = 100 + 75 * Math.cos(rad);
          const ry = 100 + 75 * Math.sin(rad);
          return (
            <text
              key={range.label}
              x={rx}
              y={ry}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#393939"
              dy="0.33em"
            >
              {range.label}
            </text>
          );
        })}
        {/* Range bands values */}
        {GAUGE_RANGES.map((range, idx) => {
          const ang = ((range.min - minScore) / (maxScore - minScore)) * 180 - 90;
          const rad = (ang * Math.PI) / 180;
          const rx = 100 + 58 * Math.cos(rad);
          const ry = 100 + 58 * Math.sin(rad);
          return (
            <text
              key={range.min}
              x={rx}
              y={ry}
              textAnchor="middle"
              fontSize="11"
              fill="#E96909"
              dy="1em"
            >
              {range.min}
            </text>
          );
        })}
        {/* ...and last max */}
        <text
          x={100 + 58 * Math.cos((90 * Math.PI) / 180)}
          y={100 + 58 * Math.sin((90 * Math.PI) / 180)}
          textAnchor="middle"
          fontSize="11"
          fill="#E96909"
          dy="1em"
        >
          {maxScore}
        </text>
        {/* Gauge pointer */}
        <g>
          <circle cx="100" cy="100" r="14" fill="#232323" stroke="#F59E42" strokeWidth="3" />
          <rect
            x={99 - pointerWidth / 2}
            y={100 - pointerLength}
            width={pointerWidth}
            height={pointerLength}
            fill="#2d2c2c"
            rx="3.5"
            transform={`rotate(${angle}, 100, 100)`}
            style={{ filter: "drop-shadow(0px 2px 4px #d67c1d33)" }}
          />
          <circle cx="100" cy="100" r="8.5" fill="#fff" stroke="#D67C1D" strokeWidth="2" />
        </g>
      </svg>
      <div className="mt-2 text-center">
        <span className="font-bold text-3xl text-orange-600">{score}</span>
      </div>
    </div>
  );
};
export default CreditScoreGauge;
