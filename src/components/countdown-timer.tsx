import { calculateTimeToEvent } from "@/utils/countdown-utils";
import { type Framework } from "@/utils/framework-utils";
import { useState, useEffect } from "react";
import { TimeUnit } from "./time-unit";
import { cn } from "@/utils/tailwind-utils";

export const CountdownTimer = ({
  currentFramework,
  buttonRef,
  onComplete,
}: {
  currentFramework: Framework;
  buttonRef: React.RefObject<HTMLButtonElement>;
  onComplete: () => void;
}) => {
  const [countdown, setCountdown] = useState(calculateTimeToEvent());

  useEffect(() => {
  const interval = setInterval(() => {
    const newCountdown = calculateTimeToEvent(); // Recalculate countdown
    setCountdown(newCountdown);

    // Check if countdown is complete
    if (
      newCountdown.days <= 0 &&
      newCountdown.hours <= 0 &&
      newCountdown.minutes <= 0 &&
      newCountdown.seconds <= 0
    ) {
      onComplete(); // Call the completion function
      console.log("Happy New Year!");

      setTimeout(() => {
        clearInterval(interval);
        console.log("Countdown terminated.");
      }, 2000);
    }
  }, 1000);

  return () => clearInterval(interval); // Cleanup the interval on component unmount
}, []); // Add `onComplete` as a dependency


  return (
    <>
      <div className="mb-6">
        <button
          ref={buttonRef}
          className={cn(
            "text-black px-6 py-3 rounded-md text-base font-bold transition-colors duration-200",
            {
              "bg-purple-300": currentFramework === "qwik",
              "bg-sky-300": currentFramework === "safari",
              "bg-yellow-300": currentFramework === "chrome",
              "bg-teal-300": currentFramework === "tailwind",
              "bg-blue-300": currentFramework === "react",
              "bg-green-300": currentFramework === "vue",
              "bg-orange-400": currentFramework === "svelte",
              "bg-red-300": currentFramework === "mobile",
              "bg-neutral-300": currentFramework === "desktop",
            }
          )}
        >
          {countdown.days > 0 ||
          countdown.hours > 0 ||
          countdown.minutes > 0 ||
          countdown.seconds > 0
            ? "Waiting..."
            : "Happy New Year!"}
        </button>
      </div>
      <div className={"text-center flex gap-[10px]"}>
        <TimeUnit
          label="DAYS"
          value={countdown.days}
          currentFramework={currentFramework}
        />
        <TimeUnit
          label="HOURS"
          value={countdown.hours}
          currentFramework={currentFramework}
        />
        <TimeUnit
          label="MINUTES"
          value={countdown.minutes}
          currentFramework={currentFramework}
        />
        <TimeUnit
          label="SECONDS"
          value={countdown.seconds}
          currentFramework={currentFramework}
        />
      </div>
    </>
  );
};
