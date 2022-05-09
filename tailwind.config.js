module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent: '#FFB600',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
      require('flowbite/plugin')
  ],
  content: [
      "./node_modules/flowbite/**/*.js"
    ]
}
