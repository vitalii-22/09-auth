import type { NewNoteData, Note, User } from "../../types/note";
import { nextServerApi, SessionResponse } from "./api";

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  userName?: string;
}

export const fetchNotes = async (
  page: number,
  params: string = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServerApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      ...(params.trim() !== "" && { search: params }),
      tag: tag,
    },
  });

  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await nextServerApi.post<Note>(`/notes`, noteData, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  return response.data;
};

// export const deleteNote = async (noteId: string): Promise<Note> => {
//   const response = await axios.delete<Note>(`/notes/${noteId}`, {
//     headers: {
//       Authorization: `Bearer ${myToken}`,
//     },
//   });
//   return response.data;
// };

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServerApi.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  return res.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServerApi.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServerApi.post<User>("/auth/login", data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServerApi.get<SessionResponse>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServerApi.get<User>("/users/me");
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServerApi.post("/auth/logout");
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServerApi.patch<User>("/users/me", payload);
  return res.data;
};
