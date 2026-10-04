import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { execFileSync } from "child_process";
import { componentTagger } from "lovable-tagger";

/**
 * Prerender every page right after the normal client build.
 *
 * Hosts like Lovable only run `vite build`, so the static HTML that search
 * engines, link previews and AI crawlers read has to be produced inside that
 * command. After the client bundle is written we build the SSR entry and run
 * scripts/prerender.mjs, which writes dist/<page>/index.html, llms.txt and the
 * per-article .md files. Any failure is logged and the plain SPA build stays.
 */
function prerenderPlugin(): Plugin {
  let isSsrBuild = false;
  return {
    name: "zerocard-prerender",
    apply: "build",
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    async closeBundle() {
      if (isSsrBuild || process.env.ZC_PRERENDER_CHILD || process.env.ZC_SKIP_PRERENDER) return;
      const root = __dirname;
      const serverOut = path.join(root, "dist-server");
      process.env.ZC_PRERENDER_CHILD = "1";
      try {
        const { build } = await import("vite");
        await build({
          configFile: path.join(root, "vite.config.ts"),
          mode: "production",
          logLevel: "warn",
          build: { ssr: "src/entry-server.tsx", outDir: "dist-server", emptyOutDir: true },
        });
        execFileSync(process.execPath, [path.join(root, "scripts/prerender.mjs")], { cwd: root, stdio: "inherit" });
      } catch (err) {
        console.warn("[zerocard-prerender] skipped, the SPA build is still usable:", err instanceof Error ? err.message : err);
      } finally {
        delete process.env.ZC_PRERENDER_CHILD;
        fs.rmSync(serverOut, { recursive: true, force: true });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // For the prerender (SSR) build, bundle deps so Node can run the output
  // without ESM/CJS named-export interop errors.
  ssr: {
    noExternal: true,
  },
  plugins: [react(), mode === "development" && componentTagger(), mode !== "development" && prerenderPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
