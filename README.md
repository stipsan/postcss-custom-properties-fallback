# PostCSS Custom Properties Fallback

This plugins adds fallbacks to your [CSS Custom Properties] and works well as a compantion to [PostCSS Custom Properties].

## Pop Quiz!

If we remove `--color` from `:root`, what color will `h1` have in modern browsers?

```diff
:root {
-  --color: red;
}

body {
  color: green;
}

h1 {
  color: red;
  color: var(--color);
}

```

### Red or green, expand the right answer (no cheating/googling!):

<details>
  <summary><code>h1</code> is <code>red</code></summary>

![The text "Wrong answer!" over a cat screaming while firing an automatic rifle](https://user-images.githubusercontent.com/81981/99829641-d6766100-2b5c-11eb-9d0d-efaa7e45cd1b.gif)

Nope, it's `green`!

Intuitively it's easy to think that if `--color` isn't defined, then the browser should skip the `color: var(--color)` and use the valid `color: red` above it.
Especially since this is what happens in [older browsers](https://caniuse.com/css-variables) that don't support [CSS Custom Properties].

The right answer is to use the second argument in `var()` (see [Example 10 in the spec](https://www.w3.org/TR/css-variables-1/#example-8bfb9889)), also known as the fallback argument:

```css
color: var(--color, red);
```

Now it works like expected. See the spec for [more information on how invalid/missing values are treated](https://www.w3.org/TR/css-variables-1/#invalid-variables).

</details>

<details>
  <summary><code>h1</code> is <code>green</code></summary>

![The text "Yes!" over a smiling and nodding Jack Nicholson](https://user-images.githubusercontent.com/81981/99828721-9d89bc80-2b5b-11eb-9c73-9628a678194b.gif)

Right answer! Check the wrong answer to learn why that is.

</details>

## Usage

Add [PostCSS Custom Properties Fallback] to your project:

```bash
npm install postcss-custom-properties-fallback --save-dev
```

Use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssCustomPropertiesFallback = require('postcss-custom-properties-fallback');

postcss([postcssCustomPropertiesFallback(/* pluginOptions */)]).process(
  YOUR_CSS /*, processOptions */
);
```

## Options

### importFrom

The `importFrom` option is required. It works [like](https://github.com/postcss/postcss-custom-properties/blob/master/README.md#importfrom) from [CSS Custom Properties], except it doesn't support importing from CSS [yet](https://github.com/stipsan/postcss-custom-properties-fallback/blob/153ed0bed5684641e466a8c0197abbe587144f8b/src/import-from.js#L11).

```js
postcssCustomPropertiesFallback({
  importFrom: { customProperties: { '--color': 'red' } },
});
```

```pcss
h1 {
  color: var(--color);
}

/* becomes */

h1 {
  color: var(--color, red);
}
```

[css custom properties]: https://www.w3.org/TR/css-variables-1/
[postcss]: https://github.com/postcss/postcss
[postcss custom properties]: https://github.com/postcss/postcss-custom-properties
[postcss custom properties fallback]: https://github.com/stipsan/postcss-custom-properties-fallback
