const tap = require('tap');
const postcss = require('postcss');
const plugin = require('../src/plugin');

/*
 * When running tests on Windows, the output code get some extra \r on each line.
 * Remove these so snapshots work on all OSes.
 */
const clean = (str) => str.split('\r').join('');

tap.test('plugin() - simple module ', async (t) => {
  const simple = `
    .test {
      color: var(--color);
      background-color: var(--primary, blue);
      outline-color: var(--primary);
    }
  `;

  const { css } = await postcss(
    plugin({
      importFrom: {
        customProperties: { '--color': 'black', '--primary': 'yellow' },
      },
    })
  ).process(simple, { from: undefined });

  t.matchSnapshot(clean(css), 'simple example');
  t.end();
});

tap.test(
  'plugin() - resurcive module - should replace normalize.css with CDN URL',
  async (t) => {
    const recursive = `
      .test {
        color: var(--primary, var(--color));
      }
    `;

    const { css } = await postcss(
      plugin({
        importFrom: {
          customProperties: { '--color': 'black' },
        },
      })
    ).process(recursive, { from: undefined });

    t.matchSnapshot(clean(css), 'recursive example');
    t.end();
  }
);

tap.test(
  'plugin() - list module - should replace the layered box-shadow correctly',
  async (t) => {
    const list = `
      .test {
        box-shadow: var(--shadow-depth-1);
      }
    `;

    const { css } = await postcss(
      plugin({
        importFrom: {
          customProperties: {
            '--shadow-depth-1':
              '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          },
        },
      })
    ).process(list, { from: undefined });

    t.matchSnapshot(clean(css), 'list example');
    t.end();
  }
);

tap.test('plugin() - rgba', async (t) => {
  const rgba = `
    .test {
      color: rbga(var(--color-rgb), 0.5);
    }
  `;
  const { css } = await postcss(
    plugin({
      importFrom: {
        customProperties: { '--color-rgb': '45,45,45' },
      },
    })
  ).process(rgba, { from: undefined });

  t.matchSnapshot(clean(css), 'functional notation example');
  t.end();
});
