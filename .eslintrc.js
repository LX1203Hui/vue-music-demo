module.exports = {
   root: true,
   env: {
      browser: true,
      node: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:vue/essential',
      'plugin:prettier/recommended',
   ],
   parserOptions: {
      parer: 'babel-eslint',
      ecmaVersion: 9,
      sourceType: 'module',
   },
   plugins: ['vue', 'prettier'],
   rules: {
      'prettier/prettier': 0,
      'no-unused-vars': 'error',
      'no-undef': 0,
      'vue/multi-word-component-names': [
         2,
         {
            // ignores: ['APP.vue'],
         },
      ],
   },
};
