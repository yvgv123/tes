'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface OutlineColorContextType {
  outlineColor: string;
  setOutlineColor: (color: string) => void;
}

const OutlineColorContext = createContext<OutlineColorContextType>({
  outlineColor: '#00F0FF',
  setOutlineColor: () => {},
});

export function OutlineColorProvider({ children }: { children: ReactNode }) {
  const [outlineColor, setOutlineColor] = useState('#00F0FF');

  return (
    <OutlineColorContext.Provider value={{ outlineColor, setOutlineColor }}>
      {children}
    </OutlineColorContext.Provider>
  );
}

export function useOutlineColor() {
  return useContext(OutlineColorContext);
}
