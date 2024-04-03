import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./pages/NewNote/NewNote";
import { Tag, RawNote, NoteData } from "./entities/model";
import { useLocalStorage } from "./entities/hooks/useLocalStorage";
import { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

    const notesWithTags = useMemo(() => {
        notes.map(({ title, markdown, tagIds }) => ({
            title,
            markdown,
            tags: tags.filter((tag) => tagIds.includes(tag.id)),
        }));
    }, [tags, notes]);

    function onCreateNote({ tags, ...data }: NoteData) {
        setNotes((prev) => [...prev, { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) }]);
    }

    function onAddTag(tag: Tag) {
        setTags((prev) => [...prev, tag]);
    }

    return (
        <Container>
            <Routes>
                <Route path="/" element={<h1>HOME</h1>} />
                <Route
                    path="/new"
                    element={<NewNote onAddTag={onAddTag} onSubmit={onCreateNote} />}
                />
                <Route path="/:id">
                    <Route index element={<h1>Show</h1>} />
                    <Route path="edit" element={<h1>Edit</h1>} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Container>
    );
};

export default App;
