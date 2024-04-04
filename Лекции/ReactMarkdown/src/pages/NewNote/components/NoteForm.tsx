import { useState, FC } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Note, NoteData, Tag } from "../../../entities/model";
import CreatebleReactSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

type NoteFormProps = {
    onSubmit: (data: NoteData, id: string | undefined) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
    note?: Note;
};

const NoteForm: FC<NoteFormProps> = (props: NoteFormProps) => {
    const { onSubmit, onAddTag, availableTags, note } = props;

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>(note?.title ?? "");
    const [markdown, setMarkdown] = useState<string>(note?.markdown ?? "");
    const [selectedTags, setSelectedTags] = useState<Tag[]>(note?.tags ?? []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit({ title, markdown: markdown, tags: selectedTags }, note?.id);
        navigate("/");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="title"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Tags</Form.Label>
                            <CreatebleReactSelect
                                isMulti
                                value={selectedTags.map(({ label, id }) => ({ label, value: id }))}
                                onChange={(tags) =>
                                    setSelectedTags(
                                        tags.map(({ label, value }) => ({ label, id: value }))
                                    )
                                }
                                options={availableTags.map(({ label, id }) => ({
                                    label,
                                    value: id,
                                }))}
                                onCreateOption={(label) => {
                                    const newTag = { label, id: uuidv4() };
                                    onAddTag(newTag);
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="markdown">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                onChange={(e) => setMarkdown(e.target.value)}
                                required
                                value={markdown}
                                as="textarea"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Stack>
            <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button type="submit" variant="primary">
                    Save
                </Button>
                <Button type="button" variant="outline-secondary">
                    Cancel
                </Button>
            </Stack>
        </Form>
    );
};

export default NoteForm;
