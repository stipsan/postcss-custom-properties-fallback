import tap from 'tap';
import postcss from 'postcss';
import plugin from '../src/plugin';

const simple = `
.test {
  color: var(--color);
  background-color: var(--primary, blue);
  outline-color: var(--primary);
}
`;
/*
 * When running tests on Windows, the output code get some extra \r on each line.
 * Remove these so snapshots work on all OSes.
 */
const clean = (str) => str.split('\r').join('');

tap.test(
  'plugin() - simple module - should replace normalize.css with CDN URL',
  async (t) => {
    const { css } = await postcss(
      plugin({
        importFrom: {
          customProperties: { '--color': 'black', '--primary': 'yellow' },
        },
      })
    ).process(simple, { from: undefined });

    t.matchSnapshot(clean(css), 'simple example');
    t.end();
  }
);
