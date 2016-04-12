import transit from 'transit-immutable-js'
import immutable from 'immutable'
import scenes from './scenes'
import { REPLACE_STORE } from './replaceable_reducer'

export function configure(store) {
  window.transit = transit
  window.immutable = immutable

  window.addEventListener('message', ({ origin, data }) => {
    if (origin !== document.location.origin) return

    if (!data || !data.type) {
      console.error('Screenwriter failed. Could not get your message')
      return
    }

    if (data.type === 'scene:setup') {
      const scene = scenes[data.id]
      if (!scene) return
      const { state } = scene
      const deserializedState = {
        todos: transit.fromJSON(state.todos)
      }
      store.dispatch({
        type: REPLACE_STORE,
        state: deserializedState
      })
    } else if (data.type === 'scene:serialize') {
      const state = store.getState()
      const serialized = {
        todos: JSON.stringify(transit.toJSON(state.todos))
      }
      console.group()
      console.info('Serialized state')
      console.info('todos', serialized.todos)
      console.groupEnd()
    }
  }, false)
}
