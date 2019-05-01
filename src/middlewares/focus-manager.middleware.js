export default () => {
  let returnFocusTo = null;

  return store => next => action => {
    if (action.triggerRef) {
      returnFocusTo = action.triggerRef;
    }

    if (action.restoreFocus && returnFocusTo) {
      returnFocusTo.focus();
    }

    return next(action);
  };
};
