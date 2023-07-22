import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { SearchContextProvider } from './context/SearchContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SearchContextProvider>
      <AuthContextProvider>
        <Provider store={store} >
          <App />
        </Provider>
      </AuthContextProvider>
    </SearchContextProvider>
  </BrowserRouter>
)
