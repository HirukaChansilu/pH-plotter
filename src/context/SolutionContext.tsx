import { createContext, ReactNode, useState } from "react";

import { Burette, Flask } from "../lib/types";

interface SolutionContextProps {
  flask: Flask;
  burette: Burette;
  setFlask: (flaskData: Partial<Flask>) => void;
  setBurette: (buretteData: Partial<Burette>) => void;
}

const initialState: SolutionContextProps = {
  flask: {
    type: null,
    content: null,
    volume: null,
  },
  burette: {
    type: null,
    content: null,
    volumePoints: null,
  },
  setFlask: () => {},
  setBurette: () => {},
};

const SolutionContext = createContext<SolutionContextProps>(initialState);

function SolutionProvider({ children }: { children: ReactNode }) {
  const [flask, setFlask] = useState<Flask>(initialState.flask);
  const [burette, setBurette] = useState<Burette>(initialState.burette);

  function setFlaskHandler(flaskData: Partial<Flask>) {
    setFlask((preVal) => {
      return {
        ...preVal,
        ...flaskData,
      };
    });
  }

  function setBuretteHandler(buretteData: Partial<Burette>) {
    setBurette((preVal) => {
      return {
        ...preVal,
        ...buretteData,
      };
    });
  }

  return (
    <SolutionContext.Provider
      value={{
        flask,
        burette,
        setFlask: setFlaskHandler,
        setBurette: setBuretteHandler,
      }}
    >
      {children}
    </SolutionContext.Provider>
  );
}

export { SolutionContext, SolutionProvider };
