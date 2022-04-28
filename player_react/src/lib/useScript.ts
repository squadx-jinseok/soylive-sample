import { useEffect, useState } from "react";

export default function useScript(src: string) {
  const [status, setStatus] = useState(src ? "loading" : "idle");

  useEffect(() => {
    if (!src) {
      setStatus("idle");
      return;
    }

    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${src}"]`
    );

    const setAttributeFromEvent = (event: Event) => {
      if (!script) return;
      setStatus(event.type === "load" ? "ready" : "error");
    };

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;

      document.body.appendChild(script);
    }

    script.addEventListener("load", setAttributeFromEvent);
    script.addEventListener("error", setAttributeFromEvent);

    return () => {
      if (!script) return;
      script.removeEventListener("load", setAttributeFromEvent);
      script.removeEventListener("error", setAttributeFromEvent);
    };
  }, [src]);

  return status;
}
