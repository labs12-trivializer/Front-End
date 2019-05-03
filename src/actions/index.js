export * from './games';
export * from './rounds';
export * from './questions';
export * from './answers';
export * from './profile';
export * from './categories';

export const testAction = (profile) => ({
  type: 'TEST_ACTION',
  payload: profile
});
