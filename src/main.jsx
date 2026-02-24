import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css'

import { AudioProvider } from './components/ui/AudioEngine.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AudioProvider>
            <App />
        </AudioProvider>
    </React.StrictMode>,
)
