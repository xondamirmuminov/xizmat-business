export const formatPriceInputValue = (val: string | number) => {
  if (!val) return "";
  const num = String(val).replace(/\D/g, "");
  return new Intl.NumberFormat("uz-UZ").format(Number(num));
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uz-UZ", {
    currency: "UZS",
    style: "currency",
    minimumFractionDigits: 0,
  }).format(price);
};
