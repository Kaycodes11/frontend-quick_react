import React from "react";
import InputMasking from "./components/ReactHookForm/InputMasking";
import FieldArrayMin from "./components/ReactHookForm/UsingFieldArray/FieldArrayMin";
import FormDate from "./components/ReactHookForm/FormDate";
import GetCompareFields from "./components/ReactHookForm/FieldCompare";
import FieldArray1 from "./components/ReactHookForm/UsingFieldArray/FieldArray1";
import FieldArray2 from "./components/ReactHookForm/UsingFieldArray/FieldArray2";
import FieldArray4 from "./components/ReactHookForm/UsingFieldArray/FieldArray4";
import FieldArrayRegisterWhen from "./components/ReactHookForm/UsingFieldArray/FieldArray3";
import UsingSetValue from "./components/ReactHookForm/UsingSetValue";
import UsingSetValueDependant from "./components/ReactHookForm/UsingSetValueDependant";
import UsingClearErrors from "./components/ReactHookForm/UsingClearErrors";
import UsingResetField from "./components/ReactHookForm/UsingResetField";
import UsingResetForFieldArray from "./components/ReactHookForm/UsingResetForFieldArray";
import UsingResetWithSubmit, {
    ControlledForm,
    UncontrolledForm,
} from "./components/ReactHookForm/UsingResetWithSubmit";
import UsingUnRegister from "./components/ReactHookForm/UsingUnRegister"; // RH
import NormalizedField from "./components/ReactHookForm/practice/NormalizedField";
import UseFieldArrayUnregister2 from "./components/ReactHookForm/UsingFieldArray/FieldArray3a"; // RH
import UsingWatch from "./components/ReactHookForm/CustomInput/UsingWatch"; // RH
import Trigger from "./components/ReactHookForm/Trigger"; // RH
import ValidationOnFieldChange from "./components/ReactHookForm/Form/ValidationOnFieldChange"; // RH
import Form2 from "./components/ReactHookForm/Form/Form2"; // Formik
import Form1 from "./components/ReactHookForm/Form/Form1"; // RH
import BasicForm from "./components/formik-examples/BasicForm"; // Formik
import TwoFactorVerificationForm from "./components/BasicForm/FormikContext"; // Formik
import NestedForm from "./components/BasicForm/NestedForm"; // Formik
import TypedForm from "./components/BasicForm/TypedForm"; // Formik
import UsingFormArray from "./components/BasicForm/UsingFieldArray"; // same as the InviteFriends: Formik
import UsingFormik from "./components/BasicForm/UsingFormik"; // Formik
import AsyncSubmission from "./components/formik-examples/AsyncSubmission"; // Formik
import CheckBox from "./components/formik-examples/CheckBox"; // Formik
import Dependant from "./components/formik-examples/Dependant"; // Formik
import DependantAsync from "./components/formik-examples/DependantAsync"; // Formik
import InviteFriends from "./components/formik-examples/FormArray"; // Formik
import TextInputLiveFeedback from "./components/formik-examples/TextInputLiveFeedback"; // Formik
import Radio from "./components/formik-examples/Radio"; // Formik
import TsForm from "./components/formik-examples/TsForm"; // Formik
import DependantField from "./components/ReactHookForm/DependantField";
import Form from "./components/ReactHookForm/Form";
import WatchFieldOrFields from "./components/ReactHookForm/Form/WatchFieldOrFields";
import MyForm from "./components/MultiSelectAndTags/MyForm";
import FileUploadForm from "./components/FileHandling/FileUploadForm";
import Account from "./components/StepperForm/Account";
import Final from "./components/StepperForm/Final";
import Details from "./components/StepperForm/Details";
import Stepper from "./components/StepperForm/Stepper";
import StepperControl from "./components/StepperForm/StepperControl";
import StepperContext from "./contexts/StepperContext";
import Payment from "./components/StepperForm/Payment";
import Masking from "./components/InputMasking/Masking";
import {
    CustomSingleOrMultiSelect,
    CustomSelect,
    CustomSelectAlt
} from "./components/MultiSelectAndTags/CustomSingleOrMultiSelect";
import {GroupBase} from "react-select";


// Assuming options are of this shape
interface OptionType {
    value: string;
    label: string;
}

// `options` will be allocated and executed just once during the initial render, and it will do the exact once again when this component unmount and remount
const options: OptionType[] = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
];

// This is the value (structure) that needs to followed when using `label` and `options` properties for `options` prop
const groupedOptions: GroupBase<OptionType>[] = [
    {
        label: 'Group 1',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
        ],
    },
    {
        label: 'Group 2',
        options: [
            { value: 'option3', label: 'Option 3' },
            { value: 'option4', label: 'Option 4' },
        ],
    },
];


// make branch from this branch
function App() {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [userData, setUserData] = React.useState<string>("");
    const [finalData, setFinalData] = React.useState<any[]>([]);
    const steps = ["Account Info", "Personal Details", "Payment", "Complete"];

    const displayStep = (step: number) => {
        switch (step) {
            case 1:
                return <Account/>;
            case 2:
                return <Details/>;
            case 3:
                return <Payment/>;
            case 4:
                return <Final/>;

            default:
                return <div>Unknown Step</div>;
        }
    };

    // This should be optimized / memoized since it is being passed as Prop to StepperControl
    const handleClick = React.useCallback(
        (direction: "back" | "next") => {
            let newStep = currentStep;

            direction.toLowerCase() === "next" ? newStep++ : newStep--;

            newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        },
        [currentStep, steps.length]
    );


    return (
        // <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        //   {/* <WatchFieldOrFields /> */}
        //   <div className="container horizontal mt-5">
        //     <Stepper steps={steps} currentStep={currentStep} />

        //     {/* Display Components */}

        //     <div className="my-10 p-10">
        //       <StepperContext.Provider
        //         value={{ userData, setUserData, finalData, setFinalData }}
        //       >
        //         {displayStep(currentStep)}
        //       </StepperContext.Provider>
        //     </div>
        //   </div>

        //   {currentStep !== steps.length && (
        //     <StepperControl
        //       currentStep={currentStep}
        //       handleClick={handleClick}
        //       steps={steps}
        //     />
        //   )}
        // </div>

        <>
            {/*<FileUploadForm/>*/}
            <CustomSingleOrMultiSelect options={options} onChange={(option) => console.log(option)} myCustomProp={"I am custom prop"}  isMulti={true}/>
            <CustomSelectAlt<OptionType, false> options={options} onChange={(option) => console.log(option)} myCustomProp={"Alt: This is a custom prop"} isMulti={false} />
            <CustomSingleOrMultiSelect options={groupedOptions} onChange={(option) => console.log(option)} myCustomProp={"I am custom prop"}  isMulti={true}/>
        </>
    );
}

// Define options for the select dropdown


export default App;
