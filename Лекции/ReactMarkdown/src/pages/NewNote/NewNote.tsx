import { NoteData, Tag } from "../../entities/model";
import NoteForm from "./components/NoteForm";
import { FC } from "react";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
};

const NewNote: FC<NewNoteProps> = (props: NewNoteProps) => {
    const { onSubmit, onAddTag } = props;

    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm onAddTag={onAddTag} onSubmit={onSubmit} />
        </>
    );
};

export default NewNote;
