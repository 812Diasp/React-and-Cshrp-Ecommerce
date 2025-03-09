import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression'; // Импортируем плагин

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip', // Используйте 'gzip' или 'brotliCompress'
      ext: '.gz', // Расширение для сжатых файлов (по умолчанию .gz для gzip)
      threshold: 1024, // Минимальный размер файла для сжатия (в байтах)
      deleteOriginFile: false, // Удалять ли оригинальные файлы после сжатия
    }),
  ],
});