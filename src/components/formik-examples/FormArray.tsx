import { Formik, Field, Form, ErrorMessage, FieldArray, SharedRenderProps } from "formik";
import * as Yup from "yup";

const initialValues = {
  friends: [
    {
      name: "",
      email: "",
    },
  ],
};

// WORKING : This is one way to define FieldArray
const InviteFriends = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {({ move, swap, unshift, pop, form, insert, remove, push }) => (
              <div>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`friends.${index}.name`}>Name</label>
                        <Field name={`friends.${index}.name`} placeholder="Jane Doe" type="text" />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`friends.${index}.email`}>Email</label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button type="button" className="secondary" onClick={() => remove(index)}>
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: "", email: "" })}
                >
                  Add Friend
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Invite</button>
        </Form>
      )}
    </Formik>
  </div>
);

// WORKING : This is one way to define FieldArray (deprecated)
export const FriendList = () => (
  <div>
    <h1>Friend List</h1>
    <Formik
      initialValues={{ friends: ["jared", "ian", "brent"] }}
      // @ts-ignore
      onSubmit={(values) =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      validationSchema={Yup.object().shape({
        friends: Yup.array().of(
          Yup.string()
            .min(2, "Must be at least 2 characters")
            .max(10, "Must be less  than 20 characters")
            .required("This field is required")
            .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces")
        ),
      })}
      render={({ values }) => (
        <Form>
          <FieldArray
            name="friends"
            render={(arrayHelpers) => (
              <div>
                {values.friends && values.friends.length > 0 ? (
                  values.friends.map((friend, index) => (
                    <div key={index}>
                      <Field name={`friends.${index}`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    {/* show this when user has removed all friends from the list */}
                    Add a friend
                  </button>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    />
  </div>
);

export const FriendList2 = () => (
  <div>
    <h1>Friend List</h1>
    <Formik
      initialValues={{ friends: ["jared", "ian", "brent"] }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          {/* now "component has type issue so has to use children so prefer `InviteFriends`" */}
          {/* <FieldArray name="friends" validateOnChange component={} children={} /> */}
          <button type="submit">Invite</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default InviteFriends;

// https://formik.org/docs/api/fieldarray
