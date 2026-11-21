import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

const alias = {
  '~': fileURLToPath(new URL('./app', import.meta.url)),
  '~~': fileURLToPath(new URL('./', import.meta.url)),
}

export default defineConfig({
  resolve: { alias },
  test: {
    projects: [
      { resolve: { alias }, test: { name: 'unit', include: ['tests/unit/**/*.test.ts'], environment: 'node' } },
      { resolve: { alias }, test: { name: 'build', include: ['tests/build/**/*.test.ts'], exclude: ['tests/build/filled.test.ts'], environment: 'node' } },
      { resolve: { alias }, test: { name: 'filled', include: ['tests/build/filled.test.ts'], environment: 'node' } },
    ],
  },
})
