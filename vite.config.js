import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // server: {
  //   host: '0.0.0.0'  // Sniedz iespēju piekļūt lokālajam Dev serverim caur tīklu (0.0.0.0 nozīmē, ka tiks pieņemti pieprasījumi no visām adresēm, ieskaitot LAN un publiskās adreses)
  // }
})
