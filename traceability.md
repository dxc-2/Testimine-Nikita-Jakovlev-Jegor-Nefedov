# Traceability Matrix – MiniShop

| REQ | Test cases | Automated tests | Layer | Last result | Defect |
|---|---|---|---|---|---|
| REQ-L-01 | TC-L-01..03 | UT-01..04 | unit | PASS | |
| REQ-L-02 | TC-L-04..06 | UT-05..08 | unit | UT-07 FAIL | D-L-01 |
| REQ-L-03 | TC-L-07 | UT-09..10 | unit | PASS | |
| REQ-L-04 | TC-L-08..09 | UT-11..15 | unit | UT-13 FAIL | D-L-02 |
| REQ-L-05 | TC-L-10 | UT-16..17 | unit | UT-17 FAIL | D-L-03 |
| REQ-L-06 | TC-L-11 | UT-18..20 | unit | PASS | |
| REQ-L-07 | TC-L-12 | UT-21..25 | unit | UT-24 FAIL | D-L-04 |
| REQ-API-01 | TC-01 | TC-01 | api | PASS | |
| REQ-API-02 | TC-02, TC-03 | TC-02, TC-03 | api | TC-03 FAIL | D-A-01 |
| REQ-API-03 | TC-04, TC-05, TC-06 | TC-04, TC-05, TC-06 | api | not run yet | |
| REQ-API-04 | TC-07 | TC-07 | api | not run yet | |
| REQ-API-05 | TC-08 | TC-08 | api | not run yet | |
| REQ-API-06 | TC-09, TC-10 | TC-09, TC-10 | api | not run yet | |
| REQ-API-07 | TC-09 | TC-09 | api | not run yet | |
| REQ-API-08 | – | – | api | NOT TESTED | |
| REQ-UI-10 | UI-15, UI-16 | UI-15, UI-16 [ui] | UI | UI-16 FAIL | D-L-02 (same root cause) |