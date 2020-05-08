type Conditions = 'onlyRussianLetters' | '';

export const testFor = (condition: Conditions, str: string) => {
  switch (condition) {
    case 'onlyRussianLetters':
      return /^[а-яА-ЯёЁ -0-9]+$/.test(str);
    default:
      throw new Error(`Can not find condition ${condition}`);
  }
};
