/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  endOfLine: 'lf',
  arrowParens: 'always',
  jsxSingleQuote: true,
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-classnames',
    'prettier-plugin-merge'
  ],
  endingPosition: 'relative'
}
