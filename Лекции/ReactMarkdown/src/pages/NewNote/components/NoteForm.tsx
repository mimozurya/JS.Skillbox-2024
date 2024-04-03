import { useRef, useState, FC } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { NoteData, Tag } from "../../../entities/model";
import CreatebleReactSelect from "react-select/creatable";
import { useInput } from "../../../entities/hooks/useInput";
import { v4 as uuidv4 } from "uuid";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
};

const NoteForm: FC<NoteFormProps> = (props: NoteFormProps) => {
    const { onSubmit, onAddTag } = props;

    const titleRef = useRef<HTMLInputElement>(null);
    const [markdown, setMarkdown] = useState<string>("");
    const [value, setValue] = useInput();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit({ title: titleRef.current!.value, markdown: markdown, tags: [] });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} className="title" required />
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
            <input value={value} onChange={setValue} />
            {value}
        </Form>
    );
};

export default NoteForm;
