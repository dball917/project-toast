import React from "react";

export default function useEscapeKey({
  contextElement = window,
  handler = () => {},
}) {
  const handleEsc = (event) => {
    if (event.code === "Escape") {
      handler();
    }
  };

  React.useEffect(() => {
    contextElement.addEventListener("keydown", handleEsc);
    return () => {
      contextElement.removeEventListener("keydown", handleEsc);
    };
  }, [contextElement, handler]);
}
