# White item filter for POE2

Filter tool for POE2 to highlight level &amp; class appropriate normal items. Main use case is for leveling HC characters.

# Usage

## Generate new filter in your browser

1. Go to [https://poe2wf.github.io/](https://poe2wf.github.io/)
2. Use the interface to generate a filter.
3. Copy the filter to your clipboard.
4. Append the filter to your existing filter file.

## Use filter on your windows machine

1. Download the latest release from the [Releases](https://github.com/pkrs/poe2-white-item-filter/releases) page.
2. Run the executable.
3. Follow the instructions to update your existing filter.

# Functionality

- Select your class to make the intial suggestion
- Choose which types of items you want to filter (armor/evasion, just armor, just evasion, etc)
- Choose how many levels behind your current level you want to still show

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
