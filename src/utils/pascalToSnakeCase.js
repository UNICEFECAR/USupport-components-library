export const pascalToSnakeCase = (word) => {
  return word
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};
