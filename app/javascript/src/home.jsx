import React from 'react'
import ReactDOM from 'react-dom'
import Layout from '@src/layout'
import Feed from './tweets/feed'

import './home.scss';

const Home = props => (
  <Layout>
  <Feed />
  </Layout>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
