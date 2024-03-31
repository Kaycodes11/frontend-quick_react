import React from 'react';
import Select, {ActionMeta, GroupBase, Props} from "react-select";

const options = [
    {value: "john", level: "john"}, {value: "james", level: "james"}, {value: "jones", level: "jones"}, {
        value: "jonas",
        level: "jonas"
    },
]

export default function CustomSelect<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: Props<Option, IsMulti, Group>) {
    // If you have a single-select you can type onChange like this:

    const onChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
        // do something
    }

    // If you have a multi-select you can type onChange like this:

    const onChangeForMulti = (option: readonly Option[], actionMeta: ActionMeta<Option>) => {
        // do something
    }
    return (
        <Select {...props} theme={(theme) => ({...theme, borderRadius: 0})}/>
    );
}