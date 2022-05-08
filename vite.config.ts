import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { dirResolver, DirResolverHelper } from 'vite-auto-import-resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DirResolverHelper(),
    Unocss({
      transformers: [
        transformerVariantGroup(),
      ],
    }),
    AutoImports({
      imports: ['vue', 'vitest', '@vueuse/core'],
      resolvers: [
        dirResolver()
      ]
    })
  ]
})
