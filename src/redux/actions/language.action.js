export const languageTypes = {
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
};

export const changeLanguage = language => {
  return {
    type: languageTypes.CHANGE_LANGUAGE,
    language,
  };
};
