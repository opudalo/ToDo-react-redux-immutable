import React from 'react'
import { render } from 'react-dom'
import cn from 'classnames'
import scenes from './scenes'

class ScreenWriter extends React.Component {
  constructor() {
    super()

    this.state = {
      page: '/index.html',
      active: null
    }
  }

  componentWillMount() {
    const page = document.location.search.slice(1)

    if (!page) return
    this.setState({ page })
  }

  onSceneClick = (id) => {
    const { contentWindow } = this.refs.iframe
    this.setState({
      active: id
    })
    contentWindow.postMessage({
      type: 'scene:setup',
      id
    }, document.location.origin + this.state.page)
  }

  onSerializeClick = () => {
    const { contentWindow } = this.refs.iframe
    contentWindow.postMessage({
      type: 'scene:serialize'
    }, document.location.origin + this.state.page)
  }

  render() {
    const page = this.state.page
    const $list = Object.keys(scenes).map(id =>
      <li className={ cn('item', { active: this.state.active === id }) }
          onClick={() => this.onSceneClick(id)}>{scenes[id].name}
      </li>
    )
    return (
      <div className="page">
        <div className="stories">
          <div className="title">Scenes</div>
          <ul className="list">{$list}</ul>
          <div className="button" onClick={this.onSerializeClick}>Serialize state</div>
        </div>
        <iframe ref="iframe" className="iframe" src={page} />
      </div>
    )
  }
}

render(
  <ScreenWriter />,
  document.getElementById('screenwriter')
)
