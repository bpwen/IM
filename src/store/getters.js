const getters = {
    token: state => state.user.token,
    hidden(state) {
        // eslint-disable-next-line no-unused-vars
        const temp = state.current 
        if (typeof document.hasFocus !== 'function') {
          return document.hidden
        }
        return !document.hasFocus()
      }
  }
  export default getters
  