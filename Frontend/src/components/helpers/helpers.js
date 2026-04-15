const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥" };

function formatPrice(amount, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol} ${Number(amount).toLocaleString("en-IN")}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export { formatPrice, formatDate, getInitials };