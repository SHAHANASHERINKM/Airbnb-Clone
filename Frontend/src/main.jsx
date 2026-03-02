import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { PopupProvider } from './components/Popup'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PopupProvider>
        <App />
      </PopupProvider>
    </Provider>
  </StrictMode>,
)
