const react = require('@vitejs/plugin-react')
const { defineConfig } = require('vite')
const path = require('path')

module.exports = defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      // Use path.resolve to ensure Windows handles the slash correctly
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".tsx"],
  },
})