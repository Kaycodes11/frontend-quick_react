# What is initial load or loading the component first time ?

Whenever the component loads for the first time 1) directly or programmatically navigation to the URL 2) Reloading

now, afterwards whenever said component "Re-Renders"; The code within useEffect won't run if dependency is empty


## I know by default, The child component will render/execute each time whenever its parent component re-renders

```typescriptreact

const Dummy: React.FC = function MyDummy() {

    <!-- When parent component loads for the first time and then for each subsequent re-renders;  -->

    <!-- <Dummy /> will execute the code within itself in the 2 phases  -->

    <!-- 1. Render Phase: First , the JSX will be executed (or compared whether it has updated or not); then State variable i.e. "useState" -->

    <!-- 2. Commit Phase: here, useEffect will be executed -->

    NOTE: React doesn't cache the component (state variable, JSX or useEffect's data) rather it will evaluate each time
    <Dummy /> run/execute then only add the modified/updates to virtual dom i.e. "Reconciliation" and "then updated 
    Virtual dom becomes the new main DOM"



}

export default function App () {
    return (
        <div>
        <!-- Whether <Dummy /> uses prop from its parent or not or if take whether that prop being update or not -->
        <!-- By default, <Dummy /> will re-render whenever its parent component re-renders -->
        <Dummy />
        </div>
    )
}


```

# context/custom hook (https://chat.openai.com/c/53252945-be03-4e3b-b314-829e3c8ee590)


## Within component; state variable defined locally, context or custom hook (React.useState) then if component A calls
the setter method to update state and component B consumer getter both components will re-render

so the component from where called the method and all the (consuming / subscribed) components that uses the state variable
will re-render to reflect and sync state changes