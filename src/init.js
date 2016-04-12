import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import { makeReplaceable } from './screenwriter/replaceable_reducer'
import { configure } from './screenwriter/client'

import 'styles/app.scss'
import 'bootstrap/dist/css/bootstrap.css'


const store = createStore(makeReplaceable(rootReducer))

class ProviderHelper extends React.Component {
  componentDidMount() {
    const ctx = this.refs.provider.getChildContext()
    configure(ctx.store)
  }

  render() {
    return (
      <Provider ref="provider" store={store}>
        <App />
      </Provider>
    )
  }
}

render(
  <ProviderHelper />,
  document.getElementById('todo')
)

