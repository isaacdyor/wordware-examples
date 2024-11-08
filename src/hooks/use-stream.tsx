import { useState, useCallback } from "react";

export function useStream() {
  const [streamedContent, setStreamedContent] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStream = useCallback(
    async (appSlug: string, inputs: Record<string, unknown>) => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/stream/${appSlug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: inputs,
          }),
        });

        if (!response.ok || !response.body) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        let currentData = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            setIsCompleted(true);
            break;
          }

          const chunk = new TextDecoder().decode(value);
          currentData += chunk;

          const events = currentData.split("\n\nevent: ");
          currentData = events.pop() ?? "";

          for (const event of events) {
            const jsonStr = event
              .split("\n")
              .filter((line) => line.startsWith("data: "))
              .map((line) => line.replace("data: ", ""))
              .join("");

            if (!jsonStr) continue;
            const parsedData = JSON.parse(jsonStr) as Record<string, unknown>;
            try {
              if (parsedData.type === "chunk") {
                const newContent = (parsedData.content as string) || "";
                setStreamedContent((prev) => prev + newContent);
                console.log(newContent);
              }
            } catch (error) {
              console.error("Failed to parse stream data:", error);
            }
          }
        }
      } catch (error) {
        console.error("Failed to generate AI response:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    fetchStream,
    streamedContent,
    setStreamedContent,
    isCompleted,
    isLoading,
  };
}
