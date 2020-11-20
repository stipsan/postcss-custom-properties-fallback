const valueParser = require('postcss-value-parser');
// match custom property inclusions
// @TODO optimize to skip vars with fallbacks already
const customPropertiesRegExp = /(^|[^\w-])var\([\W\w]+\)/;

// whether the declaration should be potentially transformed
const isTransformableDecl = (decl) => customPropertiesRegExp.test(decl.value);

// eslint-disable-next-line no-empty-pattern
module.exports = ({} = {}) => ({
  postcssPlugin: 'postcss-custom-properties-fallback',
  prepare() {
    // @TODO check importFrom arguments

    const customProperties = { '--color': 'black' };

    return {
      Declaration(node) {
        if (isTransformableDecl(node)) {
          const parsed = valueParser(node.value);

          parsed.walk((node) => {
            // Only deal with vars without a fallback
            if (node.type !== 'function' || node.nodes.length !== 1) {
              return;
            }
            const fallback = customProperties[node.nodes[0].value];
            if (fallback) {
              node.nodes.push(
                { type: 'divider', value: ',', after: ' ' },
                { type: 'word', value: fallback }
              );
            }
          });

          node.value = parsed.toString();
        }
      },
    };
  },
});
