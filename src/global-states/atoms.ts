import { atom } from "recoil";

export type CurrentUser = {
  bio: string;
  createdAt: Date;
  department: string;
  description: string;
  displayName: string;
  email: string;
  github: string;
  grade: string;
  id: number;
  instagram: string;
  knownAs: string;
  photoURL: string;
  twitter: string;
  uid: number;
  university: string;
};

export const currentUserState = atom<CurrentUser | null>({
  key: "currentUserState",
  default: null,
});
