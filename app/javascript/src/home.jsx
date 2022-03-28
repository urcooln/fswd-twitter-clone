import React from 'react'
import ReactDOM from 'react-dom'

import './home.scss';

const Home = props => (
  <h1>Home page react is working</h1>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
