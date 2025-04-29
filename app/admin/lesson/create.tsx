import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin";

export const LessonCreate = () => {
    return (
        <Create>
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
                <ReferenceInput
                    source="courseId"
                    reference="courses"
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