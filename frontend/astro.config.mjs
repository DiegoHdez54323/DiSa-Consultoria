// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "static",

  adapter: vercel(),


  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sanity({
      projectId: "tyjgqdg3",
      dataset: "production",
      useCdn: false, // for static builds
    }),
    react(),
  ],
});
