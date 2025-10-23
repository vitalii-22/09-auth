"use client";

import { useRouter } from "next/navigation";
import css from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface NotesPreviewProps {
  noteId: string;
}

const NotesPreview = ({ noteId }: NotesPreviewProps) => {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });
  const router = useRouter();

  const close = () => router.back();

  return (
    <Modal onClose={close}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
          <p className={css.tag}>{note?.tag}</p>
          <button className={css.backBtn} onClick={close}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotesPreview;
