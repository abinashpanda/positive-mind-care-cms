import { defineConfig } from 'tsup'

export default defineConfig({
  watch: process.env.NODE_ENV === 'test',
  target: 'node16',
})
