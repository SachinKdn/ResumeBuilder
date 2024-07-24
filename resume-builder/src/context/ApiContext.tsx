// src/context/ApiContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  ICreateResume,
  ILoginUser,
  createResume,
  getResume,
  updateResume,
  login,
  register,
  IUser,
  UserResponse,
} from "../api/apiServices";
import { IResume } from "./interfaceTypes";

interface ApiContextProps {
  // login: (credentials: ICredentials) => Promise<any>;
  // signup: (userData: IUserData) => Promise<any>;
  createResume: (resumeData: ICreateResume) => Promise<any>;
  login: (loginData: ILoginUser) => Promise<UserResponse>;
  register: (userData: IUser) => Promise<any>;
  getResume: (id: string) => Promise<any>;
  updateResume: (id: string, resumeData: IResume) => Promise<any>;
  // sendResume: (id: string, recipientData: IRecipientData) => Promise<any>;

  fetchResume?: (id: string) => Promise<any>;
  resumeInfo?: any;
  user?: any;
  setUser: (userData: IUser) => void;
  setResumeInfo: (resumeData: IResume) => void;
  logout: () => void;
}
const ApiContext = createContext<ApiContextProps | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
}
const defaultResumeInfo: IResume = {
  isLightTheme: true,
  title: "",
  username: "",
  useremail: "",
  fullname: "",
  email: "",
  phoneNumber: "",
  address: {
    address: "",
    pinCode: "",
  },
  jobRole: "",
  education: [],
  experience: [],
  projects: [],
  skills: [],
  socialMedia: {
    linkedin: {
      name: "",
      link: "",
    },
    github: {
      name: "",
      link: "",
    },
    website: {
      name: "",
      link: "",
    },
  },
};

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const [resumeInfo, setResumeInfo] = useState<IResume>(defaultResumeInfo);
  const apiMethods = {
    // login,
    // signup,
    login,
    register,
    createResume,
    getResume,
    updateResume,
    // sendResume,
  };
  const fetchResume = async (resumeId: string | undefined) => {
    if (!resumeId) {
      console.log("Resume ID is not fetched yet.");
      return;
    }
    console.log(resumeId);
    const data = await getResume(resumeId);
    console.log("Logged in:", data);

    setResumeInfo(data.resume);

    return data.resume;
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    // <ApiContext.Provider value={apiMethods} >
    <ApiContext.Provider
      value={{
        ...apiMethods,
        fetchResume,
        resumeInfo,
        setResumeInfo,
        updateResume,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
