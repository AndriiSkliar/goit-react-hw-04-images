import css from './Button.module.css'

export const Button = ({ onClick, children }) => (
  <div className={css.buttonWrapper}>
    <button className={css.button} onClick={onClick}>
      {children}
    </button>
  </div>
);



