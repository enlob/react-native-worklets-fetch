# GitHub Issue for react-native-reanimated

## Title
App crashes silently when using fetch() inside worklet runtime

## Description

When calling `fetch()` inside a worklet runtime created with `react-native-worklets`, the app crashes immediately without printing any error messages to the console. This makes it impossible to debug what's going wrong.

## Environment

- **Expo SDK**: 54.0.25
- **React Native**: 0.81.5
- **react-native-reanimated**: ~4.1.1
- **react-native-worklets**: 0.6.1
- **React**: 19.1.0
- **Platform**: Android/iOS (tested on physical device)

## Steps to Reproduce

1. Clone the reproduction repository: [link to be added]
2. Install dependencies: `npm install`
3. Run on device: `npx expo run:android` or `npx expo run:ios`
4. App crashes immediately on load

## Code

```typescript
import { createWorkletRuntime, scheduleOnRuntime } from 'react-native-worklets';

function testWorkletFetch() {
  const fetchRuntime = createWorkletRuntime({ name: 'fetchRuntime' });
  scheduleOnRuntime(fetchRuntime, () => {
    'worklet';

    console.log('[Worklet Fetch] Starting fetch test...');

    fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'GET',
    })
      .then((data) => {
        console.log('[Worklet Fetch] Success:', data);
      })
      .catch((error) => {
        console.error('[Worklet Fetch] Error:', error.message);
      });
  });
}
```

## Expected Behavior

The fetch request should either:
- Complete successfully and log the response
- Fail with a proper error message that can be caught and logged

## Actual Behavior

The app crashes silently without any error output in the console. The crash happens immediately when the worklet attempts to execute the fetch call.

## Additional Context

- The same fetch call works fine when executed in the main JS thread
- No error messages appear in Metro bundler, Logcat, or Xcode console
- The initial console.log('[Worklet Fetch] Starting fetch test...') does not appear, suggesting the crash happens before or during the fetch call

## Reproduction Repository

A minimal reproduction is available at: [repository link]

## Question

Is fetch() supposed to be supported in worklet runtimes? If not, what's the recommended way to make network requests from within a worklet?
