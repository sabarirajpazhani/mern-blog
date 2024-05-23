import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

//it is used to redirect the api request from frontend to backend server. FOR THE SIGNUP PAGE
export default defineConfig({  
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        secure:false,
      },
    },
  },
  plugins: [react()],
});
