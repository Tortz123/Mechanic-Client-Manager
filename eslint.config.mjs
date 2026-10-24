import js from '@eslint/js';
import globals from 'globals';

export default [
    // Never lint installed packages or generated output
    {
        ignores: ['node_modules/', 'coverage/'],
    },

    // ESLint's built-in recommended rules (catches bugs, not style)
    js.configs.recommended,

    // Backend: Node.js ES modules
    {
        files: ['src/**/*.mjs', '*.mjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node,
        },
    },

    // Frontend: browser ES modules loaded by the HTML pages
    {
        files: ['frontend/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },
    },
];
