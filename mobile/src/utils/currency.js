const currencyFormatBRL = (value) => {
  const currencyValueFormatBRL = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
  return currencyValueFormatBRL;
};
export default currencyFormatBRL;
