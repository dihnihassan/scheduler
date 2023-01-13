import { useState } from "react"

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);


  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
      return
    }
    setHistory((prev) => [...prev, newMode]);
  }

  function back() {
    if (history.length >= 2) {
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  }

  return { mode: history[history.length-1], transition, back };
}