interface IError {
  [key: string]: Error;
}

export const ApiError: IError = {
  default: new Error('Произошла какая-то ошибка'),
  auth: new Error('Ошибка авторизации'),
  login: new Error('Неправильный логин или пароль'),
};
