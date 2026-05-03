import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import './index.js';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Context from './components/context/context'


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <Context>
      <App/>
    </Context>
    </BrowserRouter>
  
)
