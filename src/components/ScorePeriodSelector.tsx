
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

const PERIODS = [
  { value: "7d", label: "Last 7 days" },
  { value: "1mo", label: "Last 1 month" },
  { value: "3mo", label: "Last 3 months" },
  { value: "6mo", label: "Last 6 months" },
  { value: "1y", label: "Last 1 year" },
  { value: "2y", label: "Last 2 years" },
  { value: "3y", label: "Last 3 years" },
  { value: "custom", label: "Custom Range" },
];

interface ScorePeriodSelectorProps {
  value: { period: string, dateRange?: { from?: Date; to?: Date } };
  onChange: (value: { period: string, dateRange?: { from?: Date; to?: Date } }) => void;
}

const ScorePeriodSelector: React.FC<ScorePeriodSelectorProps> = ({ value, onChange }) => {
  const [customRange, setCustomRange] = useState<{ from?: Date; to?: Date }>(value.dateRange || {});

  const handlePeriodChange = (period: string) => {
    if (period === "custom") return;
    onChange({ period });
  };

  const handleCustomDateChange = (range: { from?: Date; to?: Date }) => {
    setCustomRange(range);
    if (range.from && range.to) {
      onChange({ period: "custom", dateRange: range });
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-3 mb-6">
      <div className="flex flex-wrap gap-2">
        {PERIODS.map(({ value: periodVal, label }) => (
          <Button
            key={periodVal}
            size="sm"
            className={`rounded-full px-4 ${
              value.period === periodVal
                ? "bg-orange-500 text-white"
                : "bg-white text-orange-700 border border-orange-200 hover:bg-orange-50"
            }`}
            variant={value.period === periodVal ? "default" : "outline"}
            onClick={() => {
              if (periodVal !== "custom") handlePeriodChange(periodVal);
            }}
          >
            {label}
          </Button>
        ))}
      </div>
      {/* Custom range calendar */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            className={`ml-1 rounded-full border-orange-300 text-orange-700 bg-white flex items-center gap-1`}
            variant="outline"
          >
            <CalendarDays className="h-4 w-4 mr-1 text-orange-700" />
            {customRange.from && customRange.to
              ? `${format(customRange.from, "MMM d")} - ${format(customRange.to, "MMM d, yyyy")}`
              : "Pick date range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={customRange}
            onSelect={(range) => {
              if (range) handleCustomDateChange(range);
            }}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default ScorePeriodSelector;
