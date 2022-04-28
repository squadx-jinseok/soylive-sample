import { CSSProperties, useEffect, useRef, useState } from "react";
import "./App.css";
import useScript from "./lib/useScript";

function App() {
  const playerRef = useRef<HTMLDivElement>(null);
  const status = useScript(
    "https://dev.player.soylive.net/static/js/SoyLivePlayer.js"
  );
  const [active, setActive] = useState<boolean>(false);
  const [pip, setPip] = useState<boolean>(false);

  const onDoubleClick = () => {
    window.SoyPlayer.dispatch("SET_PIP_MODE", false);
    setPip(false);
  };

  useEffect(() => {
    if (status !== "ready" || !playerRef.current) return;
    const callback: SoyPlayerCallback = {
      CLICK_PIP: () => setPip(true),
      CLICK_CLOSE: () => {
        console.log("나가기");
      },
      CLICK_PRODUCT: undefined,
      CLICK_SHARE: undefined,
      ERROR: undefined,
      LOGIN: undefined,
      RENDER: () => setActive(true),
    };

    window.SoyPlayer.setup({
      id: "626a2f9d934bf0badf1fbc8c", //방송주소,
      elementId: playerRef.current.id,
      callback,
    });

    return () => {
      window.SoyPlayer.destroy();
    };
  }, [status]);

  const styles: CSSProperties = pip
    ? {
        position: "fixed",
        background: "transparent",
        top: "unset",
        left: "unset",
        right: "16px",
        bottom: "16px",
        width: "126px",
        height: "224px",
        boxShadow: "0px 0px 8px #333",
        borderRadius: "10px",
        overflow: "hidden",
      }
    : active
    ? {
        position: "fixed",
        background: "#00000080",
        inset: 0,
        zIndex: 1000,
        display: "block",
      }
    : {
        display: "none",
      };

  if (status !== "ready") {
    return <div>{status}</div>;
  }

  return (
    <div className="App">
      <div
        id="soy_player"
        ref={playerRef}
        style={styles}
        onDoubleClick={onDoubleClick}
      />
    </div>
  );
}

export default App;
