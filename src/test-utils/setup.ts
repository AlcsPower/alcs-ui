import '@testing-library/jest-dom/vitest';
import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import type { AxeMatchers } from 'vitest-axe/matchers';

expect.extend(matchers);

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Assertion<T = any> extends AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
