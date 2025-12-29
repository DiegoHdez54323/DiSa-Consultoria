// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

import sanity from "@sanity/astro";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://disa-consultoria.vercel.app",
  output: "static",

  adapter: vercel(),

  vite: {
    plugins: [tailwindcss(), svgr()],
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes("/page/") && !page.includes("/admin"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize: (item) => {
        if (
          item.url === "https://disa-consultoria.vercel.app/" ||
          item.url.includes("/blog/")
        ) {
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.DAILY;
        } else {
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        }
        return item;
      },
    }),
    sanity({
      projectId: "tyjgqdg3",
      dataset: "production",
      useCdn: false, // for static builds
    }),
    react(),
  ],
});
