import * as Raven from '@sentry/browser';

// Not sure if this is the best place to execute this stuff... but it works!
const initialiseRaven = () => {
  Raven.init({
    dsn: 'https://41ee31e35ded4903bd4f5d029c1efb6e@sentry.io/1461448'
  });

  const storage = localStorage.getItem('persist:root');

  if (storage) {
    let { profile } = JSON.parse(storage, (key, value) => {
      return key === 'profile'
        ? JSON.parse(value)
        : value;
    });

    if (profile) {
      const { id, username, email } = profile;
      Raven.configureScope(scope => {
        scope.setUser({ id, username, email });
      });
    }
  }
};

initialiseRaven();

export const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
};

export default Raven;
