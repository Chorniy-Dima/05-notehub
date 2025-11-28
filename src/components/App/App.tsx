import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox.tsx';
import { fetchNotes, deleteNote, createNote } from '../../services/noteService.ts';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '../NoteList/NoteList.tsx';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination.tsx';
import Modal from '../Modal/Modal.tsx';
import NoteForm from '../NoteForm/NoteForm.tsx';
import type { Note } from '../../types/note.ts';


export default function App() {

  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => 
      setName(event.target.value),
        500
  );

  const { data } = useQuery({
    queryKey: ["note", name, page],
    queryFn: () => fetchNotes(name, page),
    placeholderData: keepPreviousData,
  });


  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", name, page] })
    }
  });

  const mutationCreate = useMutation({
    mutationFn: async (note: Note) => {
      await createNote(note)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", name, page] })
    }
  })


  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={handleChange} />
          {data?.notes?.length !== 0 && (data?.totalPages ?? 0) > 1 && <Pagination totalPages={data?.totalPages ?? 0} currentPage={page} onPageChange={setPage} />}
          <button className={css.button} onClick={openModal}>Create note +</button>
        </header>
        <NoteList notes={data?.notes ?? []} onDelete={mutation.mutate} />
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} onCreate={mutationCreate.mutate} />
          </Modal>
        ) }
      </div>
    </>
  )
}

