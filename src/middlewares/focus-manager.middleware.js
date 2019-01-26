export default () => {
  let returnFocusTo = null;

  return store => next => action => {
    if (action.triggerRef) {
      returnFocusTo = action.triggerRef;
    }

    if (action.type === 'DISMISS_TOAST' && returnFocusTo) {
      returnFocusTo.focus();
    }

    return next(action);
  };
};
