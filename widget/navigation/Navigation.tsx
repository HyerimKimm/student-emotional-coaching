"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Screen = "home" | "check" | "chat";

export default function Navigation() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  function handleScreenChange(screen: Screen) {
    setCurrentScreen(screen);

    if (screen === "chat") {
      router.push("/chat");
      return;
    }

    if (screen === "check") {
      router.push("/check");
      return;
    }

    router.push("/");
  }

  return (
    <nav className="nav-tabs" role="tablist">
      <button
        className={`nav-tabs__item ${currentScreen === "home" ? "nav-tabs__item--active" : ""}`}
        onClick={() => handleScreenChange("home")}
        role="tab"
        aria-selected={currentScreen === "home"}
      >
        홈
      </button>
      <button
        className={`nav-tabs__item ${currentScreen === "check" ? "nav-tabs__item--active" : ""}`}
        onClick={() => handleScreenChange("check")}
        role="tab"
        aria-selected={currentScreen === "check"}
      >
        마음 체크
      </button>
      <button
        className={`nav-tabs__item ${currentScreen === "chat" ? "nav-tabs__item--active" : ""}`}
        onClick={() => handleScreenChange("chat")}
        role="tab"
        aria-selected={currentScreen === "chat"}
      >
        AI 코치
      </button>
    </nav>
  );
}
