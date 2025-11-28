import css from './SearchBox.module.css';

interface BoxProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export default function SearchBox({ onChange }: BoxProps) {

    return (
        <>
            <input
                className={css.input}
                type="text"
                placeholder="Search notes"
                onChange={onChange}
            />
        </>
  )
}