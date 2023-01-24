const myNumberFormat = (number: number) => {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(
    number
  );
};

export { myNumberFormat };
