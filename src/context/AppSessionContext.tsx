import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translate, type Language } from "@/i18n/translations";

export type AppRole = "guard" | "forester";

export interface SessionUser {
  id: string;
  name: string;
  role: AppRole;
  roleLabel: string;
  range: string;
  section: string;
  beat: string;
}

const USERS: Record<AppRole, SessionUser> = {
  guard: {
    id: "FG-BAMUR-0231",
    name: "Ramesh Pradhan",
    role: "guard",
    roleLabel: "Forest Guard",
    range: "Redhakhol",
    section: "Charmal",
    beat: "Bamur",
  },
  forester: {
    id: "FR-CHARMAL-0114",
    name: "Sanjay Behera",
    role: "forester",
    roleLabel: "Forester",
    range: "Redhakhol",
    section: "Charmal",
    beat: "Charmal",
  },
};

interface AppSessionValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  login: (role: AppRole) => void;
  logout: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const AppSessionContext = createContext<AppSessionValue | undefined>(undefined);

const ROLE_STORAGE_KEY = "fms.session.role";
const LANG_STORAGE_KEY = "fms.session.language";

export function AppSessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const storedRole = localStorage.getItem(ROLE_STORAGE_KEY);
    if (storedRole === "guard" || storedRole === "forester") {
      setUser(USERS[storedRole]);
    }
    const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
    if (storedLang === "od" || storedLang === "en") {
      setLanguageState(storedLang);
    }
  }, []);

  const login = useCallback((role: AppRole) => {
    setUser(USERS[role]);
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(ROLE_STORAGE_KEY);
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    localStorage.setItem(LANG_STORAGE_KEY, next);
  }, []);

  const t = useCallback((key: string) => translate(language, key), [language]);

  const value = useMemo<AppSessionValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      language,
      setLanguage,
      t,
    }),
    [user, login, logout, language, setLanguage, t],
  );

  return (
    <AppSessionContext.Provider value={value}>
      {children}
    </AppSessionContext.Provider>
  );
}

export function useAppSession() {
  const ctx = useContext(AppSessionContext);
  if (!ctx) {
    throw new Error("useAppSession must be used inside AppSessionProvider");
  }
  return ctx;
}