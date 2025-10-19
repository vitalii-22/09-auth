import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Page for writing note",
  openGraph: {
    title: "Create note",
    description: "Page for writing note",
    url: "https://08-zustand-silk.vercel.app/notes/action/create",
    images: [
      {
        url: "https://08-zustand-silk.vercel.app/notes/action/create",
        width: 1200,
        height: 630,
        alt: "Note hub image",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <NoteForm />
      </div>
    </main>
  );
}
