import { atom } from "recoil";
import { CurrentUserType } from "src/components/types/type";

export const currentUserState = atom<CurrentUserType | null>({
  key: "currentUserState",
  default: null,
});
