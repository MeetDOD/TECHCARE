import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './components/ui/themeprovider.jsx'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </RecoilRoot>
)
