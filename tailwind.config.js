module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        accent: '#FFB600',
        'runte-orange': '#FC7400',
        'runte-purple': '#5353DA',
        twitter: '#1DA1F2',
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
