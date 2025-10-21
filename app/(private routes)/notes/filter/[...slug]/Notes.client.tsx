"use client";
import { useEffect, useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import css from "./page.module.css";
import toast, { Toaster } from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { Note } from "@/types/note";
import { fetchNotes } from "@/lib/api/clientApi";
import Link from "next/link";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag?: string;
}

function NotesClient({ initialData, tag }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, searchQuery, tag],
    queryFn: () => fetchNotes(currentPage, searchQuery, tag),
    placeholderData: keepPreviousData,
    initialData,
  });

  const updateSearchQuery = useDebouncedCallback((query) => {
    setCurrentPage(1);
    setSearchQuery(query);
  }, 1000);

  useEffect(() => {
    setSearchQuery("");
    setInputValue("");
    setCurrentPage(1);
  }, [tag]);

  useEffect(() => {
    if (data?.notes && data.notes.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            value={inputValue}
            onSearch={(val) => {
              setInputValue(val);
              updateSearchQuery(val);
            }}
          />
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              onPageChange={setCurrentPage}
              currentPage={currentPage}
            />
          )}

          <Link href="/notes/action/create">Create note</Link>
        </header>
      </div>
      <Toaster position="top-right" />
      {isSuccess && data?.notes && <NoteList notes={data?.notes} />}
    </>
  );
}

export default NotesClient;
