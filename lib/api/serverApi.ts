import { cookies } from "next/headers";
import { nextServerApi } from "./api";
import { Note, User } from "@/types/note";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServerApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServerApi.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NotesRequest {
  page?: number;
  perPage?: number;
  tag?: string;
  title?: string;
}

export const fetchNotes = async (
  page: number,
  params: string = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const response = await nextServerApi.get<FetchNotesResponse>(`/notes`, {
    params: {
      page,
      perPage: 12,
      ...(params.trim() !== "" && { search: params }),
      tag: tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};
// fetchNotes;
// fetchNoteById;
