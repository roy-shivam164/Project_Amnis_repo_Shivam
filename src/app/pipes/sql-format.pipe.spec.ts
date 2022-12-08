import { SqlFormatPipe } from './sql-format.pipe';

describe('SqlFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new SqlFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
