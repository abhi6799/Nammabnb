import { createContext } from "react";

interface LocaleContextType {
  locale: string;
  setLocale: (newLocale: string) => void;
}

const defaultValue: LocaleContextType = {
  locale: "en",
  setLocale: () => {},
};

const LocaleContext = createContext<LocaleContextType>(defaultValue);
export default LocaleContext;