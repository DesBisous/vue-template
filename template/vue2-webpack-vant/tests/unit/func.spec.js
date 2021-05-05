function isTrue() {
  return true;
}

describe('function', () => {
  test('test:func:isTrue', () => {
    expect(isTrue()).toBe(true);
  });
});
