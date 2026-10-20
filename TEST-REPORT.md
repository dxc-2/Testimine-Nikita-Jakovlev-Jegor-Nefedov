# Test report – 20/10/2026, 09:31:53

**Verdict: RED – 5 failing test(s), do not release**

| Total | Passed | Failed | Flaky | Skipped | Pass rate | Duration |
|---|---|---|---|---|---|---|
| 12 | 7 | 5 | 0 | 0 | 58 % | 2.5 s |

## By project

| Project | Passed | Failed | Flaky | Skipped |
|---|---|---|---|---|
| api | 7 | 3 | 0 | 0 |
| ui | 0 | 2 | 0 | 0 |

## Failed tests (5)

| ID | Test | Project | File | Error |
|---|---|---|---|---|
| TC-03 | Inventory API (server.js) › TC-03 GET /items/999 returns 404 with error body | api | items.api.spec.ts | Expected: 404 · Received: 200 |
| TC-06 | Inventory API (server.js) › TC-06 POST /items with qty -1 returns 400 (boundary) | api | items.api.spec.ts | Expected: 400 · Received: 201 |
| TC-09 | Inventory API (server.js) › TC-09 DELETE /items/1 returns 204 without body | api | items.api.spec.ts | Expected: 204 · Received: 200 |
| FLAKY-01 | FLAKY-01 order confirmation checked after a fixed sleep | ui | flaky.ui.spec.ts | Error: browserType.launch: Executable doesn't exist at C:\Users\JegorNefedov\AppData\Local\ms-playwright\chromium_headless_shell-1248\chrome-headless-shell-win64\chrome-headless-shell.exe |
| UI-01 | UI-01 products page shows 6 products | ui | shop.ui.spec.ts | Error: browserType.launch: Executable doesn't exist at C:\Users\JegorNefedov\AppData\Local\ms-playwright\chromium_headless_shell-1248\chrome-headless-shell-win64\chrome-headless-shell.exe |

## Slowest tests

- 0.1 s – Inventory API (server.js) › TC-01 GET /items returns 200 and an array of 2 items [api]
- 0.0 s – Inventory API (server.js) › TC-04 POST /items with valid body returns 201 and the new item [api]
- 0.0 s – Inventory API (server.js) › TC-07 POST /items with invalid sku returns 400 [api]

## Evidence

- HTML report with traces and screenshots: `playwright-report/index.html` (`npm run report`)
- Machine-readable: `test-results/junit.xml`, `test-results/results.json`
