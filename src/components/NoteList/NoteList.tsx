import css from './NoteList.module.css';
import type { Response } from '../../types/note';

interface NoteListProps {
    notes: Response[],
    onDelete: (id: string) => void,
}

export default function NoteList({ notes, onDelete }: NoteListProps) {

    return (
        <>
            <ul className={css.list}>
                {notes.map((item: Response) => {
                    return (
                        <li className={css.listItem} key={item.id}>
                            <h2 className={css.title}>{item.title}</h2>
                            <p className={css.content}>{item.content}</p>
                            <div className={css.footer}>
                                <span className={css.tag}>{item.tag}</span>
                                <button className={css.button} onClick={() => onDelete(item.id)}>Delete</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
  )
}