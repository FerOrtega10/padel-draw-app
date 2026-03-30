import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}", // Asegúrate de que esto esté presente
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./utils/**/*.{js,ts}",
  ],
  theme: {
    extend: {
    //   colors: {
    //       action: '#00A676',   // Jade Green
    //       primary: '#003F5C',  // Deep Navy
    //       accent: '#FFD23F',   // Saffron Yellow
    //       muted: '#B0B0B0',    // Silver
    //       surface: '#FAFAFA',  // Off-White
    //   }
        colors: {
          action: '#A8E10C',   // Lime
          primary: '#0A2342',  // Deep Navy
          secondary: '#FF7A00',   // Orange
          gray: '#B0B0B0',    // Silver
          surface: '#FAFAFA',  // Off-White
      }
    },
    backgroundImage: {
      'padel-gradient': 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
      'primary-gradient': 'linear-gradient(to right, #0A2342, #164073)',
    }
  }
}