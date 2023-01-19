const parseNumber = (text: string) => {
  return text ? Number(text.match(/\d/g)?.join("")) : 0;
};
export { parseNumber };
