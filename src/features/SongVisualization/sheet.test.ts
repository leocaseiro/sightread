import { deriveState, getViewport } from './sheet'

test('getViewport should return correct viewport', () => {
  const state = {
    time: 10,
    pps: 2,
    windowWidth: 1000,
  }

  const expectedViewport = {
    start: 20,
    end: 2020,
  }

  expect(getViewport(state)).toEqual(expectedViewport)
})

test('deriveState should return correct state', () => {
  const givenState = {
    time: 10,
    pps: 2,
    windowWidth: 1000,
  }

  const expectedState = {
    ...givenState,
    viewport: getViewport(givenState),
  }

  expect(deriveState(givenState)).toEqual(expectedState)
})