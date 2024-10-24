import { StrictMode } from 'react'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
