//  Импортируем библиотеки  //
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

//  Импортируем стили  //
import './index.css';

//  Импортируем компоненты  //
import App from './components/App';

//  Импортируем функцию анализа эффективности работы приложения  //
import reportWebVitals from './reportWebVitals';
// import { HashRouter } from 'react-router-dom';  //

//  Создаем корневой элемент и рендерим в него компонент приложения  //
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
//    <React.StrictMode>  пока не иопользуем с Router 5.2.1  //
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
