import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import userInStyles from "../userIn.module.css";
import { signIn } from "../../services/actions/user";
import { selectors, useAppDispatch, useAppSelector } from "../..";
import { useForm } from "../../utils/hooks/useForm";

export const LogIn = () => {
  const {values, handleChange, setValues} = useForm<{email: string; password: string}>({email: "", password: ""});
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (values.email && values.password) {
      dispatch(signIn(values.email, values.password))
      .then(() => history.push("/profile"));
    }
  };

  return (
    <>
      <form className={userInStyles.userInform} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          placeholder="E-mail"
          extraClass="mt-6 mb-6"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <PasswordInput
          placeholder="Пароль"
          extraClass="mb-6"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
        <p className="text text_type_main-default mt-20">
          Вы — новый пользователь?{" "}
          <Link to="/register" className={userInStyles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default mt-4">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={userInStyles.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </>
  );
};
