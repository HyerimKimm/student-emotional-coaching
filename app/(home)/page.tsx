"use client";

import { useState } from "react";
import { HomeDashboard } from "@/pages/screens/HomeDashboard";
import "@/shared/styles/app.scss";

type Screen = "home" | "check" | "chat";

export default function DashboardPage() {
  return <HomeDashboard />;
}
