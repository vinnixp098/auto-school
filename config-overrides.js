const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

console.log("⚙️ Carregando config-overrides.js...");

module.exports = override(
  addWebpackAlias({
    "@assets": path.resolve(__dirname, "src", "assets"),
  })
);
