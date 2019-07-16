export const ErrorGenerateHelper = (err_message, err_code = -1) => {
  return {
    errCode: err_code,
    errMessage: err_message
  };
};