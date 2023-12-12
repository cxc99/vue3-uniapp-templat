import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // transpileDependencies: ['uview-plus'],
  plugins: [
    uni(),
    WindiCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@/request/callApi': ['callApi'],
        },
      ],
      dts: 'src/types/auto-imports.d.ts', // 依赖表
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
})
