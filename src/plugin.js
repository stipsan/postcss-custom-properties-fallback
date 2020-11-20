// match custom property inclusions
// @TODO optimize to skip vars with fallbacks already
const customPropertiesRegExp = /(^|[^\w-])var\([\W\w]+\)/;

// whether the declaration should be potentially transformed
const isTransformableDecl = (decl) => customPropertiesRegExp.test(decl.value);

module.exports = ({} = {}) => ({
  postcssPlugin: 'postcss-custom-properties-fallback',
  prepare() {
    // @TODO check importFrom arguments

    return {
      Declaration(node) {
        if (isTransformableDecl(node)) {
          const originalValue = decl.node;
          console.log({ originalValue });
        }
      },
    };
  },
});
