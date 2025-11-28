import axios from 'axios';
import type { Response, Note } from '../types/note';

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface fullResp {
    notes: Response[],
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
    return response.data
};

export const deleteNote = (id: string) => {
    return axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    }) 
}

export const createNote = (note: Note) => {
  return axios.post(
    "https://notehub-public.goit.study/api/notes",
    note,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
};