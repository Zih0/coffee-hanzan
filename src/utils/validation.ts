export const isValidEmpty = (nickname: string) => {
  return nickname.trim() === "";
};

export const isValidLength = (nickname: string) => {
  return nickname.trim().length >= 4;
};

export const isValidEn = (nickname: string) => {
  const regEngNum = /^[a-zA-Z0-9]+$/;

  return regEngNum.test(nickname.trim());
};
