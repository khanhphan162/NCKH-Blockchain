"use client";

import {Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";

import { ModuleList } from "./module/list";
import { ModuleCreate } from "./module/create";
import { ModuleEdit } from "./module/edit";

import { LessonList } from "./lesson/list";
import { LessonCreate } from "./lesson/create";
import { LessonEdit } from "./lesson/edit";

import { MaterialList } from "./material/list";
import { MaterialCreate } from "./material/create";
import { MaterialEdit } from "./material/edit";

const dataProvider = simpleRestProvider("/api");

export const App = () => {
    return(
        <Admin dataProvider={dataProvider}>
            <Resource
                name="courses"
                list={CourseList}
                create={CourseCreate}
                edit={CourseEdit}
                recordRepresentation="title"
            />
            <Resource
                name="modules"
                list={ModuleList}
                create={ModuleCreate}
                edit={ModuleEdit}
                recordRepresentation="title"
            />
            <Resource
                name="lessons"
                list={LessonList}
                create={LessonCreate}
                edit={LessonEdit}
                recordRepresentation="title"
            />
            <Resource
                name="materials"
                list={MaterialList}
                create={MaterialCreate}
                edit={MaterialEdit}
                recordRepresentation="title"
            />
        </Admin>
    )
};

export default App;