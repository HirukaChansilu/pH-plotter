import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Settings } from "../lib/types";

interface SettingsContextProps {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}

const initialSettings: Settings = {
  kw: 1e-14,
  concentrationUnit: "moldm-3",
  volumeUnit: "cm3",
};

const SettingsContext = createContext<SettingsContextProps>({
  settings: initialSettings,
  setSettings: () => {},
});

function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContext, SettingsProvider };
