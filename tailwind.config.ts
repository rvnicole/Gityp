import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        borderColor: 'hsl(var(--border))',
        inputColor: 'hsl(var(--input))',
        ringColor: 'hsl(var(--ring))',
        backgroundColor: 'hsl(var(--background))',
        foregroundColor: 'hsl(var(--foreground))',
        primaryColor: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'var(--primary-hover)'
        },
        secondaryColor: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          hover: 'var(--secondary-hover)'
        },
        destructiveColor: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          hover: 'var(--destructive-hover)'
        },
        mutedColor: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accentColor: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popoverColor: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        cardColor: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        charColor: {
          char4: 'var(--char4)'
        }
      },
    },
  },
  plugins: [],
};
export default config;
