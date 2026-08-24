# West Midlands Network Create React App template

## Get started

### Node version

- This project targets Node.js v24. Use `nvm use` or your preferred version manager to switch to Node v24 before installing.

### Installation

- Click `Use this template` in the top right hand corner of Github
- Git clone your newly created repo based on this github template
- `npm i` to install dependencies

#### Alternatively

- Clone the project: `git clone https://github.com/wmcadigital/wmn-create-react-app-template.git`
- `npm i` to install dependencies

## Installed pacakges

### Dependencies

- [Create React App](https://create-react-app.dev/docs/getting-started/)
- [node-sass](https://www.npmjs.com/package/node-sass)
- [prop-types](https://www.npmjs.com/package/prop-types)
- [react-app-polyfill](https://www.npmjs.com/package/react-app-polyfill)

### Dev Dependencies

- [eslint (included with Create React App)](https://create-react-app.dev/docs/setting-up-your-editor)
- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
- [eslint-plugin-jam3](https://www.npmjs.com/package/eslint-plugin-jam3)
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
- [prettier](https://prettier.io/)
- [react-app-rewired](https://github.com/timarney/react-app-rewired#readme)
- sass-lint (soon to move to [stylelint](https://stylelint.io/))
- sass-lint-webpack (soon to move to [stylelint-webbpack-plugin](https://stylelint.io/user-guide/integrations/task-runner))

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## File size management

### Problem

The application sends form data and attachments (images, PDFs) to an email API with a 10 MB payload limit. Previously there was no size validation — users could upload arbitrarily large files, causing submission failures with no clear error message.

### Changes

**Pre-submission size check** (`src/components/App/Form/Summary/Sections/SendRequest.tsx`)

Before converting files to base64 (which adds ~37% overhead), the total raw file size is checked against a 7 MB limit (~10 MB after base64). If exceeded, an inline error is shown and submission is blocked.

**Per-file size limit** (`src/components/shared/FileUpload/`, `src/components/shared/MultiFileUpload/`)

Added an optional `maxSizeBytes` prop set to 2 MB on all file upload steps (photo, student proof, disability proof). If a file exceeds this limit:
- **Images** (JPEG/PNG): automatically compressed using the Canvas API by scaling to max 1200px on the longest side and reducing JPEG quality iteratively until under 2 MB
- **Non-images** (PDF): an inline error is shown — the file must be manually replaced with a smaller version

**File size display** (`src/helpers/formatFileSize.ts`)

Uploaded files now show their size next to the filename (e.g. `photo.jpg (1.2 MB)`).

### Key files

| File | Purpose |
|------|---------|
| `src/helpers/compressImage.ts` | Client-side image compression using Canvas API |
| `src/helpers/formatFileSize.ts` | Human-readable file size formatting |
| `src/components/shared/FileUpload/FileUpload.tsx` | Single-file upload with per-file size limit + auto-compression |
| `src/components/shared/MultiFileUpload/MultiFileUpload.tsx` | Multi-file upload with per-file size limit + auto-compression |
| `src/components/App/Form/Summary/Sections/SendRequest.tsx` | Final submission with total size check before API call |
