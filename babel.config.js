module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "targets": "ie >= 9, iOS >= 6, last 5 versions"
      // "useBuiltIns": false,
    }]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "transform-vue-jsx",
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-transform-runtime"
  ]
};
