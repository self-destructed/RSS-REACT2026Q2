import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { fileToBase64 } from "@shared/lib/file-to-base64";

export interface Submission {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
  password: string;
  country: string;
  imageBase64?: string;
}

export type SubmissionInput = Omit<Submission, "id" | "imageBase64"> & {
  image?: File;
};

interface UserState {
  submissions: Submission[];
}

interface UserActions {
  addSubmission: (input: SubmissionInput) => Promise<string>;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        submissions: [],
        addSubmission: async (input) => {
          const { image, ...data } = input;
          const imageBase64 = image ? await fileToBase64(image) : undefined;
          const id = crypto.randomUUID();
          const submission: Submission = {
            ...data,
            id,
            imageBase64,
          };
          set((state) => ({ submissions: [...state.submissions, submission] }));
          return id;
        },
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
