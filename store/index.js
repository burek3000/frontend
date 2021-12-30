export const actions = {
    async nuxtServerInit ({
      dispatch
    }, context) {
      const nuxtServerInits =
              Object
                .keys(context.store._modules.root._children)
                .map(moduleName => `${moduleName}/nuxtServerInit`)
                .filter(initFnName => this._actions[initFnName])
  
      await Promise.all(
        nuxtServerInits.map(initFnName => dispatch(initFnName, context))
      )
    }
  }