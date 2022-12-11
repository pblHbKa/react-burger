import errorStyles from "./error404.module.css";

export const Error404 = () => {
  return (
    <>
      <div className={errorStyles.space} />
      <div className={errorStyles.textBlock}>
        <h1 className="text text_type_main-large mt-10 mb-10">404</h1>
        <h2 className="text text_type_main-medium mt-10 mb-10">
          Кажется, мы сбились с курса...
        </h2>
      </div>
    </>
  );
};
