import { atom } from "recoil";
import { useRecoilState } from "recoil";

export type CurrentUser = {
  bio: string | undefined;
  createdAt: Date;
  displayName: string | undefined;
  email: string | undefined;
  faculty: string | undefined | null;
  github: string | undefined;
  grade: string | null | undefined;
  id: number;
  instagram: string | undefined;
  photoURL: string;
  twitter: string | undefined;
  uid: string;
  university: string | undefined;
};

export const currentUserState = atom<CurrentUser | null>({
  key: "currentUserState",
  default: null,
});

type UseCurrentUserType = {
  currentUser: CurrentUser | null;
  setCurrentUser: (currentUser: CurrentUser | null) => void;
};

export const useCurrentUser = (): UseCurrentUserType => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  return { currentUser, setCurrentUser };
};
