# PostCSS Custom Properties Fallback

This plugins adds fallbacks to your [CSS Custom Properties] and works well as a compantion to [PostCSS Custom Properties].

## Pop Quiz!

If the following change happens, what color will `h1` have in modern browsers?

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

<details>
  <summary><code>h1</code> is <code>red</code></summary>

Noooo

</details>

<details>
  <summary><code>h1</code> is <code>green</code></summary>
<img src="https://user-images.githubusercontent.com/81981/99828721-9d89bc80-2b5b-11eb-9c73-9628a678194b.gif" alt="The text 'Yes!' over a smiling and nodding Jack Nicholson">
Yes that's correct! If you guessed the right answer and don't know why the <code>h1</code> isn't red, then check the wrong answer to learn why.
</details>

[css custom properties]: https://www.w3.org/TR/css-variables-1/
[postcss]: https://github.com/postcss/postcss
[postcss custom properties]: https://github.com/postcss/postcss-custom-properties
