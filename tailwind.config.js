// // tailwind.config.ts
// import type { Config } from "tailwindcss";

// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// } satisfies Config;

// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0f",
        card: "#1a1a24",
        accent: {
          pink: "#ec4899",
          purple: "#8b5cf6",
        },
      },
      boxShadow: {
        glow: "0 0 15px rgba(236, 72, 153, 0.5)",
      },
    },
  },
  plugins: [],
} satisfies Config;
