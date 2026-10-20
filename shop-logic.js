function filterProducts(products, query) {
  if (!query) return products;
  const q = query.toLowerCase();
  return products.filter(p => p.name.toLowerCase().includes(q));
}

function sortProducts(products, mode) {
  const copy = [...products];
  if (mode === 'name') {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  } else if (mode === 'price-asc') {
    copy.sort((a, b) => a.price - b.price);
  } else if (mode === 'price-desc') {
    copy.sort((a, b) => b.price - a.price);
  }
  return copy;
}

function lineTotal(price, qty) {
  return Math.round((price * qty) * 100) / 100;
}

function normalizeQuantity(qty) {
  const parsed = parseInt(qty, 10);
  if (isNaN(parsed) || parsed <= 0) {
    return 1;
  }
  return parsed;
}

function discountRateFor(code) {
  if (!code) return 0;
  const cleaned = code.trim().toUpperCase();
  if (cleaned === 'SAVE10') return 0.10;
  if (cleaned === 'SAVE20') return 0.20;
  return 0;
}

function cartTotals(rows, discountRate = 0) {
  const subtotal = rows.reduce((sum, r) => sum + lineTotal(r.price, r.qty), 0);
  const roundedSubtotal = Math.round(subtotal * 100) / 100;
  const discount = Math.round((roundedSubtotal * discountRate) * 100) / 100;
  const total = Math.round((roundedSubtotal - discount) * 100) / 100;
  return {
    subtotal: roundedSubtotal,
    discount,
    total: total < 0 ? 0 : total
  };
}

function validateCheckout(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.address || data.address.trim().length === 0) {
    errors.address = 'Address is required';
  }
  return errors;
}

module.exports = {
  filterProducts,
  sortProducts,
  lineTotal,
  normalizeQuantity,
  discountRateFor,
  cartTotals,
  validateCheckout
};