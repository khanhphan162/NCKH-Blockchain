import { Datagrid, List, ReferenceField, SelectField, TextField } from "react-admin";

export const MaterialList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <SelectField
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
                />
                <ReferenceField source="lessonId" reference="lessons"/>
                <TextField source="order" />
            </Datagrid>
        </List>
    );
};