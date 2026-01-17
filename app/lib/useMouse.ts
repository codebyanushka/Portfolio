"use client";
import { create } from "zustand";

type MouseState = {
  x: number;
  y: number;
};

export const useMouse = create<MouseState>(() => ({
  x: 0,
  y: 0,
}));
