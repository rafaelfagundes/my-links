"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "@phosphor-icons/react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun
        size={24}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-400"
      />
      <Moon
        size={24}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-400"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
