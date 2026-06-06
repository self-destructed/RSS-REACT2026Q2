import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Submission {
  id: string;
  createdAt: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
  password: string;
  country: string;
  imageBase64?: string;
}

interface UserState {
  submissions: Submission[];
}

interface UserActions {
  addSubmission: (submission: Submission) => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        submissions: [],
        addSubmission: (submission) =>
          set((state) => ({
            submissions: [...state.submissions, submission],
          })),
      }),
      { name: "user-storage" },
    ),
    { name: "UserStore" },
  ),
);

export const useSubmissions = (): UserState["submissions"] =>
  useUserStore((s) => s.submissions);

export const useAddSubmission = (): UserActions["addSubmission"] =>
  useUserStore((s) => s.addSubmission);
