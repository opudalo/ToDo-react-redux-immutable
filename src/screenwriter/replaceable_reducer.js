export const REPLACE_STORE = 'store:replace'

export function makeReplaceable(reducer) {
  return function f(state, action) {
    switch (action.type) {
      case REPLACE_STORE:
        return action.state
      default:
        return reducer(state, action)
    }
  }
}
