# Defects List – MiniShop

## 1. Logic Defects (shop-logic.js)

### D-L-01 · sortProducts sorts strings instead of numbers
- **Requirement:** REQ-L-02
- **Found by:** UT-07 (unit)
- **Severity:** High
- **Where:** `shop-logic.js`, function `sortProducts()`
- **Expected:** `price-desc` puts `249.00` first
- **Actual:** puts `89.00` first because array elements are sorted alphabetically (string comparison)
- **Status:** fixed

### D-L-02 · Discount is applied to the first row only
- **Requirement:** REQ-L-04 (and REQ-UI-10)
- **Found by:** UT-13 (unit), UI-16 (UI)
- **Severity:** High (financial calculation error)
- **Where:** `shop-logic.js`, function `cartTotals()`
- **Expected:** discount applies to the entire subtotal of the cart
- **Actual:** discount calculates correctly for the first line item only, ignoring others
- **Status:** fixed

### D-L-03 · Quantity 0 and negative numbers are allowed
- **Requirement:** REQ-L-05
- **Found by:** UT-17 (unit)
- **Severity:** High
- **Where:** `shop-logic.js`, function `normalizeQuantity()`
- **Expected:** `0`, negative numbers, `''`, `null` should normalize to `1`
- **Actual:** returns `0` or negative numbers instead of falling back to `1`
- **Status:** fixed

### D-L-04 · Email validation accepts emails without TLD
- **Requirement:** REQ-L-07
- **Found by:** UT-24 (unit)
- **Severity:** Medium
- **Where:** `shop-logic.js`, function `validateCheckout()`
- **Expected:** rejects `mari@example` because it lacks a top-level domain (`.com`, `.ee`, etc.)
- **Actual:** passes it as a valid email format
- **Status:** fixed

---

## 2. API Defects (server.js)

### D-A-01 · GET /items/:id returns 200 null for unknown id
- **Requirement:** REQ-API-02
- **Found by:** TC-03 (API)
- **Severity:** High
- **Where:** `server.js`, `GET /items/:id` endpoint
- **Expected:** HTTP status `404` with body `{ error: 'not found' }`
- **Actual:** HTTP status `200` with body `null`
- **Status:** fixed

### D-A-02 · POST /items accepts negative quantity
- **Requirement:** REQ-API-03
- **Found by:** TC-06 (API)
- **Severity:** High
- **Where:** `server.js`, `POST /items` validation
- **Expected:** HTTP status `400` with body `{ error: 'invalid qty' }` for `qty < 0`
- **Actual:** HTTP status `201` (accepts and saves negative quantity)
- **Status:** fixed

### D-A-03 · DELETE /items/:id returns 200 with body instead of 204
- **Requirement:** REQ-API-06
- **Found by:** TC-09 (API)
- **Severity:** Medium
- **Where:** `server.js`, `DELETE /items/:id` endpoint
- **Expected:** HTTP status `204` with empty response body
- **Actual:** HTTP status `200` with response content
- **Status:** fixed