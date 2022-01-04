module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        lg: '28rem',
        xl: '30rem',
        xxl: '34rem',
        largest: '40rem',
      },
      width: {
        lg: '28rem',
        xl: '30rem',
      },
      colors: {
        bgPrimary: '#f5f1ec',
      },
      fontFamily: {
        logo: ['Permanent Marker'],
        satisfy: ['Satisfy'],
        fb: ['Jost'],
        nunito: ['Nunito'],
        playfair: ['Playfair Display'],
        mont: ['Montserrat'],
      },
    },
  },
  variants: {},
  plugins: [],
};
