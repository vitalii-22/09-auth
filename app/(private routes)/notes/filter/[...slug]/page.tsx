import { fetchNotes } from "@/lib/api/clientApi";

import NotesClient from "./Notes.client";
import { Metadata } from "next";

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Note filter: ${slug[0]}`,
    description: `Notes from the category ${slug[0]}`,
    openGraph: {
      title: `Note filter: ${slug[0]}`,
      description: `Notes from the category ${slug[0]}`,
      url: "https://08-zustand-silk.vercel.app/",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note hub image",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const notes = await fetchNotes(1, "", tag);
  return <NotesClient initialData={notes} tag={tag} />;
}
