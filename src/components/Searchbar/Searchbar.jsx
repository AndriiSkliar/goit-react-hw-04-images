import { Formik, Form, Field } from "formik";
import css from './Searchbar.module.css'

export const Searchbar = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values) => {
      onSubmit(values.query);
    }}
    >
      <Form className={css.searchbar}>
        <Field type="text" name="query" placeholder="Search images and photos" className="input" autoComplete="off" autoFocus />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};
