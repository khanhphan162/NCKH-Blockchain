import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Edit, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin";

const RichTextInput = dynamic(
    () => import('ra-input-rich-text').then(mod => mod.RichTextInput),
    {ssr:false}
);

export const MaterialEdit = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Edit>
            <SimpleForm>
                <TextInput
                    source="id"
                    validate={[required()]}
                    label="Id"
                />
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
                    label="Type"
                />
                {isMounted && (
                    <RichTextInput
                        source="content"
                        label="Content"
                        editorOptions={{
                        }}
                    />
                )}
                <TextInput
                    source="videoSrc"
                    label="Video Source"
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
        </Edit>
    );
};