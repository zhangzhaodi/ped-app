// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/recommended',
    // '@vue/standard',
    'eslint:recommended'
  ],
  // extends: [
  //   // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  //   // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  //   'plugin:vue/essential', 
  //   // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  //   'standard'
  // ],
  // required to lint *.vue files
  // plugins: [
  //   'vue'
  // ],
  // add your custom rules here
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': [2, {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': true
      }
    }],
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/html-closing-bracket-newline': 'off',
    'vue/no-v-html': 'off',
    'semi': [2, 'never']
  }
}
