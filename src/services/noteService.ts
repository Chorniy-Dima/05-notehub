import axios from 'axios';
import type { Note, NoteMin } from '../types/note';

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface fullResp {
    notes: Note[],
    totalPages: number
}

export const fetchNotes = async (title: string, page: number) => {
    const response = await axios.get<fullResp>("https://notehub-public.goit.study/api/notes", {
        params: {
            search: title,
            perPage: 12,
            page
        },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const deleteResp = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`
    }
  });
  return deleteResp.data;
}

export const createNote = async (note: NoteMin): Promise<Note> => {
  const createResp = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    note,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return createResp.data;
};