import { useState } from "react";

export function useSwitch() {
  const [off, setOff] = useState<boolean>(false);
  function handleSwitch() {
    setOff(!off);
  }
  return { off, setOff, handleSwitch };
}
