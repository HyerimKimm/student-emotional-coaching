"use client";

import { useState } from "react";
import { HomeDashboard } from "@/components/screens/HomeDashboard";
import "@/styles/app.scss";

type Screen = "home" | "check" | "chat";

export default function DashboardPage() {
  return <HomeDashboard />;
}
