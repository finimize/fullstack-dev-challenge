module.exports = {
  'import/no-extraneous-dependencies': [2, {}],
  'import/no-default-export': 2,
  'import/prefer-default-export': 0,
  'import/order': [
    1,
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'never',
    },
  ],
};
