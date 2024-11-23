import type { TestingLibraryMatchers } from "@types/testing-library__jest-dom/matchers";
// import type { expect } from '@jest/globals'; <-- this was necessary because of my specific setup of cypress + jest, otherwise it was inferring the wrong expect

declare module "@jest/globals/node_modules/expect/build/types" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
  export interface Matchers<R = void, T = {}>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}
