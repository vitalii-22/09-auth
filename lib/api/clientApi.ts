import type { NewNoteData, Note, User } from "../../types/note";
import { nextServerApi, SessionResponse } from "./api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NotesRequest {
  searchQuery?: string;
  currentPage?: number;
  tag?: string;
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
  email?: string;
  username?: string;
}

export interface NotesRequest {
  searchQuery?: string;
  currentPage?: number;
  tag?: string;
}

export const fetchNotes = async ({
  searchQuery,
  currentPage,
  tag,
}: NotesRequest) => {
  const response = await nextServerApi.get<FetchNotesResponse>("/notes", {
    params: {
      ...(searchQuery !== "" && { search: searchQuery }),
      page: currentPage,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await nextServerApi.post<Note>(`/notes`, noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServerApi.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServerApi.get<Note>(`/notes/${id}`);
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
