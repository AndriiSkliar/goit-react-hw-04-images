import css from './Error.module.css'

export const Error = ({ error }) => (
  <p className={css.errorBage}>
    Oops, some error occured... Error message: {error}
  </p>
);



