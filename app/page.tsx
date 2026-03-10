"use client";

import { useState } from "react";
import { HomeDashboard } from "@/components/screens/HomeDashboard";
import { EmotionCheck } from "@/components/screens/EmotionCheck";
import { AIChat } from "@/components/screens/AIChat";
import "@/styles/app.scss";

type Screen = "home" | "check" | "chat";

export default function EmotionalCoachingApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeDashboard
            onStartCheck={() => setCurrentScreen("check")}
            onStartChat={() => setCurrentScreen("chat")}
          />
        );
      case "check":
        return <EmotionCheck onStartChat={() => setCurrentScreen("chat")} />;
      case "chat":
        return <AIChat />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {currentScreen !== "chat" && (
        <nav className="nav-tabs" role="tablist">
          <button
            className={`nav-tabs__item ${currentScreen === "home" ? "nav-tabs__item--active" : ""}`}
            onClick={() => setCurrentScreen("home")}
            role="tab"
            aria-selected={currentScreen === "home"}
          >
            홈
          </button>
          <button
            className={`nav-tabs__item ${currentScreen === "check" ? "nav-tabs__item--active" : ""}`}
            onClick={() => setCurrentScreen("check")}
            role="tab"
            aria-selected={currentScreen === "check"}
          >
            마음 체크
          </button>
          <button
            className={`nav-tabs__item ${currentScreen === "chat" ? "nav-tabs__item--active" : ""}`}
            onClick={() => setCurrentScreen("chat")}
            role="tab"
            aria-selected={currentScreen === "chat"}
          >
            AI 코치
          </button>
        </nav>
      )}
      <main>{renderScreen()}</main>
    </div>
  );
}
