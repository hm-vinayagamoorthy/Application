
# Dual File Upload - Next.js 15 + React 18 + MUI

This sample demonstrates a modular, extensible dual-file upload component where:  
- File A: **mandatory**  
- File B: **optional**  
- Accepted formats: `.xlsx`, `.csv`  

Features: OOP-based `FileUploader` service, Route Handler API to receive files, MUI UI, validations, tests.

Run (after installing deps):

```bash
npm install
create .env.local and add NEXT_PUBLIC_SECRET_SANTA_API = http://localhost:3000/secret-santa/upload (ASSEESSMENT repo)
npm run dev


```

Run tests:

```bash
npm run test
```
The API returns a download link on success.