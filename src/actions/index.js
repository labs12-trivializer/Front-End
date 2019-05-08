export * from './games';
export * from './rounds';
export * from './questions';
export * from './answers';
export * from './profile';
export * from './categories';
export * from './newRoundQuestions';
export * from './auth';
export * from './questionTypes';

export const testAction = (profile) => ({
  type: 'TEST_ACTION',
  payload: profile
});
