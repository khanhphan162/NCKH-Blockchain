import {RichTextInput} from "ra-input-rich-text";
import { Create, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin";

export const MaterialCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput
                    source="title"
                    validate={[required()]}
                    label="Title"
                />
                <SelectInput
                    source="type"
                    choices={[
                        {
                            id: "READING",
                            name: "READING",
                        },
                        {
                            id: "VIDEO",
                            name: "VIDEO",
                        },
                        {
                            id: "QUIZ",
                            name: "QUIZ",
                        },
                        {
                            id: "ASSIGNMENT",
                            name: "ASSIGNMENT",
                        },
                        {
                            id: "PROJECT",
                            name: "PROJECT",
                        },
                    ]}
                    validate={[required()]}
                />
                <RichTextInput
                    source="content"
                />
                <TextInput
                    source="videoSrc"
                />
                <ReferenceInput
                    source="lessonId"
                    reference="lessons"
                />
                <NumberInput
                    source="order"
                    validate={[required()]}
                    label="Order"
                />
            </SimpleForm>
        </Create>
    );
};