import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
  let errorMessage = 'Произошла ошибка при загрузке данных: ';

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const messageFromServer =
        error.response.data?.message ||
        error.response.data?.error ||
        'Неизвестная ошибка сервера';
      errorMessage = `Ошибка сервера (${status}) : ${messageFromServer}`;
    } else if (error.request) {
      errorMessage = 'Нет ответа от сервера';
    } else {
      errorMessage = `Ошибка при настройке запроса: ${error.message}`;
    }
  } else if (error instanceof Error) {
    errorMessage = `Ошибка: ${error.message}`;
  }

  console.error('[Axios Error]:', errorMessage);
  return errorMessage;
};
