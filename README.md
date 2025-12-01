# Worklet Fetch Crash Reproduction

Minimal reproduction for an issue where using `fetch()` inside a worklet runtime causes the app to crash without printing any error.

## Environment

- Expo SDK: 54.0.22
- React Native: 0.81.5
- react-native-reanimated: ~4.1.1
- react-native-worklets: 0.6.1
- React: 19.1.0

## Issue Description

When calling `fetch()` inside a worklet runtime created with `react-native-worklets`, the app crashes immediately without any error message in the console.

## Steps to Reproduce

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run on device:
   ```bash
   npx expo run:android
   # or
   npx expo run:ios
   ```

3. Observe the crash when the app loads

## Expected Behavior

The fetch request should either:
- Complete successfully and log the response
- Fail with an error that is caught and logged

## Actual Behavior

The app crashes silently without any error output.

## Code

See `App.tsx` for the minimal reproduction case. The issue occurs in the `testWorkletFetch()` function which:
1. Creates a worklet runtime
2. Schedules a worklet that calls `fetch()`
3. Crashes without printing any error

## Notes

This same code pattern works fine in the main JS thread but fails when executed in a worklet runtime.
