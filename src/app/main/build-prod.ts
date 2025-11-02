import esbuild from 'esbuild'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname corretamente (em ESM)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

await esbuild.build({
  entryPoints: [
    path.resolve(__dirname, 'src/main.mts'),
  ],
  bundle: true,
  platform: 'node',          // porque o main roda no Node
  target: 'node18',          // ou a versão suportada pelo Electron
  outfile: path.resolve(__dirname, 'dist-prod/main.mjs'),
  format: 'esm',             // Electron 28+ usa ESM nativamente
  tsconfig: './tsconfig.json',

  sourcemap: true,
  external: [
    'electron',              // nunca deve ser empacotado
  ]
})
