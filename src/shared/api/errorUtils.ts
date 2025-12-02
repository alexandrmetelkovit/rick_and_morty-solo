import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
  let errorMessage = 'An error occurred while loading data: ';

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const messageFromServer =
        error.response.data?.message ||
        error.response.data?.error ||
        'Unknown server error';
      errorMessage = `Server error (${status}) : ${messageFromServer}`;
    } else if (error.request) {
      errorMessage = 'No response from server';
    } else {
      errorMessage = `Error setting up request: ${error.message}`;
    }
  } else if (error instanceof Error) {
    errorMessage = `Error: ${error.message}`;
  }

  console.error('[Axios Error]:', errorMessage);
  return errorMessage;
};
