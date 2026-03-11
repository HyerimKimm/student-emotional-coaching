"use client";

import { useState } from "react";
import { HomeDashboard } from "@/components/screens/HomeDashboard";
import { EmotionCheck } from "@/components/screens/EmotionCheck";
import { AIChat } from "@/components/screens/AIChat";
import "@/styles/app.scss";

type Screen = "home" | "check" | "chat";

export default function DashboardPage() {
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

  return <main>{renderScreen()}</main>;
}
