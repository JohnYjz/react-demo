export const isFalsy = (val: unknown) => (val === 0 ? false : !val);

export const cleanObject = (obj: any) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (isFalsy(val)) {
      delete result[key];
    }
  });
  return result;
};
