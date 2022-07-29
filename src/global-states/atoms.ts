import { atom } from "recoil";
import { useRecoilState } from "recoil";

export type CurrentUser = {
  active: boolean | undefined;
  bio: string | undefined;
  createdAt: Date;
  displayName: string | undefined;
  email: string | undefined;
  faculty: string | undefined | null;
  field: string | undefined | null;
  fieldDetails: Array<string> | undefined;
  github: string | undefined;
  grade: string | null | undefined;
  instagram: string | undefined;
  photoURL: string;
  position: number;
  status: number;
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
