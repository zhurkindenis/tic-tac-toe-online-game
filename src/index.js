import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import './styles/styles.css'
import App from './components/App'

render(
    <App />,
  document.getElementById('app')
)
