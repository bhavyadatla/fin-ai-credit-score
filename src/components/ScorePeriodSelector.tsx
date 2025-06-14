
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

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
  value: { period: string, dateRange?: DateRange };
  onChange: (value: { period: string, dateRange?: DateRange }) => void;
}

const ScorePeriodSelector: React.FC<ScorePeriodSelectorProps> = ({ value, onChange }) => {
  // type DateRange = { from: Date; to?: Date } | undefined;
  const [customRange, setCustomRange] = useState<DateRange | undefined>(
    value.period === "custom" && value.dateRange && value.dateRange.from
      ? value.dateRange
      : undefined
  );

  const handlePeriodChange = (period: string) => {
    if (period === "custom") return;
    setCustomRange(undefined);
    onChange({ period });
  };

  const handleCustomDateChange = (range: DateRange | undefined) => {
    setCustomRange(range && range.from ? range : undefined);
    if (range && range.from && range.to) {
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
            {customRange && customRange.from && customRange.to
              ? `${format(customRange.from, "MMM d")} - ${format(customRange.to, "MMM d, yyyy")}`
              : "Pick date range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={customRange}
            onSelect={handleCustomDateChange}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default ScorePeriodSelector;

