export * from './games';
export * from './rounds';
export * from './questions';
export * from './answers';

export const testAction = (profile) => ({
  type: 'TEST_ACTION',
  payload: profile
});
