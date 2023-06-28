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
import UsingResetWithSubmit, { ControlledForm, UncontrolledForm } from "./components/ReactHookForm/UsingResetWithSubmit";
import UsingUnRegister from "./components/ReactHookForm/UsingUnRegister"; // RH
import NormalizedField from "./components/ReactHookForm/practice/NormalizedField";
import UseFieldArrayUnregister2 from "./components/ReactHookForm/UsingFieldArray/FieldArray3a"; // RH
import UsingWatch from "./components/ReactHookForm/CustomInput/UsingWatch"; // RH
import Trigger from "./components/ReactHookForm/Trigger"; // RH
import ValidationOnFieldChange from "./components/ReactHookForm/Form/ValidationOnFieldChange"; // RH
import Form2 from "./components/ReactHookForm/Form/Form2"; // Formik (not working)
import Form1 from "./components/ReactHookForm/Form/Form1"; // RH
import BasicForm from "./components/formik-examples/Basic"; // Formik
import TwoFactorVerificationForm from "./components/BasicForm/FormikContext"; // Formik
import NestedForm from "./components/BasicForm/NestedForm"; // Formik
import TypedForm from "./components/BasicForm/TypedForm"; // Formik
import UsingFormArray from "./components/BasicForm/UsingFieldArray"; // same as the InviteFriends: Formik
import UsingFormik from "./components/BasicForm/UsingFormik"; // Formik
import AsyncSumission from "./components/formik-examples/AsyncSumission"; // Formik
import CheckBox from "./components/formik-examples/CheckBox"; // Formik
import Dependant from "./components/formik-examples/Dependant"; // Formik
import DependantAsnyc from "./components/formik-examples/DependantAsync"; // Formik
import InviteFriends, { FriendList } from "./components/formik-examples/FormArray"; // Formik
import InstantFeedback from "./components/formik-examples/InstantFeedback"; // Formik
import Radio from "./components/formik-examples/Radio"; // Formik
import TsForm from "./components/formik-examples/TsForm"; // Formik
import "./App.css";

// make branch from this branch
function App() {
  return (
    <div className="App">
      <FieldArrayMin />
    </div>
  );
}

export default App;
