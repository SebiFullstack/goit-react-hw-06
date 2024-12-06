import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./ContactForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      "Invalid format! Expected format: XXX-XX-XX"
    )
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ContactForm = () => {
  const initialValues = {
    name: "",
    number: "",
  };
  const dispatch = useDispatch();
  const onSubmit = (values, actions) => {
    dispatch(
      addContact({
        id: crypto.randomUUID(),
        name: values.name,
        number: values.number,
      })
    );

    actions.resetForm();
  };

  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={s.form}>
        <div className={s.label_wrapper}>
          <label className={s.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            placeholder="Enter Name"
            className={s.input}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage
            className={s.errprMessage}
            name="name"
            component="span"
          />
        </div>
        <div className={s.label_wrapper}>
          <label className={s.label} htmlFor={numberFieldId}>
            Number
          </label>
          <Field
            placeholder="Enter Number"
            className={s.input}
            type="text"
            name="number"
            id={numberFieldId}
          />
          <ErrorMessage
            className={s.errprMessage}
            name="number"
            component="span"
          />
        </div>
        <button className={s.btn_submite} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;