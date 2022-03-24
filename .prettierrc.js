module.exports = {
    printWidth: 80,
    tabWidth: 4,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    importOrder: [
        '^@pages/(.*)$',
        '^@components/(.*)$',
        '^@contexts/(.*)$',
        '^@firebase/(.*)$',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
