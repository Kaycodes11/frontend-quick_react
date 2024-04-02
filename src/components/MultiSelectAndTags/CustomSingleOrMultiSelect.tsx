import React from 'react';
import Select, {ActionMeta, OnChangeValue, Props} from 'react-select';
import type {GroupBase} from 'react-select';
import type {} from 'react-select/base';

// N.B: Module augmentation in TypeScript allows you to add new properties to existing modules or libraries without modifying the original source code. This can be especially useful when working with third-party libraries, enabling you to extend their functionality or adapt them to your specific needs with strong typing support.

// Augment the 'react-select/base' module to add a custom prop
declare module 'react-select/base' {
    export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
        myCustomProp: string;
    }
}


// <Select /> has only these 3 generic types ↓
interface iSelect<Option = unknown, isMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> {
}

// How GroupBase implemented internally by react-select ↓
interface GroupBaseExample<Option> {
    readonly options: readonly Option[];
    readonly label?: string;

}


/*
*
* Oftentimes the Select component is wrapped in another component that is used throughout an app i.e. CustomSelect
* and the wrapper should be just as flexible as the original <Select /> component (i.e., allow for different Option types, groups, single-select, or multi-select).
* In order to provide this flexibility, the wrapping component i.e. <CustomSelect /> should re-declare the generics
* and forward them to the underlying <Select />. Here is an example of how to do that:
*
* [resource]
* https://stackoverflow.com/questions/66348283/to-extend-the-react-select-interface-property-in-typescript
* https://react-select.com/typescript#select-generics
* */


// N.B: so, once again,  CustomSelect is a wrapper component which accepts same generic types (refer to the iSelect) as <Select  /> and responsible for proving same type arguments that was originally in <Select /> (generic types name in Wrapper component could be different but type argument must be same as the original <Select />)

// It doesn't matter how it gets, as longs same / original type arguments provided to <Select />; it will work fine

// shape for the `Option` provided through this OptionType

interface OptionType {
    value: string;
    label: string;
}

function CustomSingleOrMultiSelect<Option extends OptionType, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: Props<Option, IsMulti, Group>) {

    // Properly type the onChange handler based on whether the select is multi-select or not.
    const onChange = (value: IsMulti extends true ? OptionType[] | null : OptionType | null, actionMeta: ActionMeta<OptionType>) => {
        console.log(value, actionMeta);
    };

    // console.log(props.onChange, props.myCustomProp); // props has access to all underlying methods and properties including react-select's properties and method and also its custom defined properties/method as well e.g `myCustomProp` on props and <Select /> itself

    // CustomSelect forwards all props to Select, including custom properties like 'myCustomProp'
    return <Select {...props} onChange={onChange as unknown as Props<OptionType, IsMulti>['onChange']}/>;
}

//---------------------------------------------------------------------------------------------------------------------

// A generic CustomSelect component that can be used for both single and multi-select.
// Notice the `Option` generic extends `OptionType`, ensuring that passed options match the expected shape.
function CustomSelectAlt<Option extends OptionType, IsMulti extends boolean>(
    props: Props<Option, IsMulti> & { myCustomProp?: string }
) {
    // Unified onChange handler that directly uses OnChangeValue
    const handleChange = (
        value: OnChangeValue<Option, IsMulti>,
        actionMeta: ActionMeta<Option>
    ) => {
        // Directly call props.onChange with the value. No need for casting or separate handlers.
        props.onChange?.(value, actionMeta);
    };

    return (
        <Select<Option, IsMulti>
            {...props}
            theme={(theme) => ({...theme, borderRadius: 0})}
            onChange={handleChange}
        />
    );
}


const CustomSelectAltV1: <Option extends OptionType, IsMulti extends boolean>(props: Props<Option, IsMulti> & { myCustomProp?: string }) => JSX.Element = (props) => {
    // Function body remains the same
    return <Select {...props} />;
};


//---------------------------------------------------------------------------------------------------------------------


// It's enough (whether single or multi) if the option's value not categorized or grouped (i.e. groupedActions App.tsx)
interface CustomSelectProps<Option extends OptionType, IsMulti extends boolean = false> extends Props<Option, IsMulti> {
}

function CustomSelect<Option extends OptionType, IsMulti extends boolean = false>(
    props: CustomSelectProps<Option, IsMulti>
) {
    return <Select<Option, IsMulti> {...props} />;
}


export {CustomSingleOrMultiSelect, CustomSelectAlt, CustomSelect};