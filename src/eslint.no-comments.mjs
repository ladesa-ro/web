const ALLOWED = [
  /^\s*@ts-(expect-error|ignore|nocheck)\b/,
  /^\s*eslint-(disable|enable)\b/,
  /^\s*eslint-disable-next-line\b/,
  /^\s*prettier-ignore\b/,
  /^\s*biome-ignore\b/,
  /^\s*v8 ignore\b/,
  /^\s*c8 ignore\b/,
  /^\s*vite-ignore\b/,
  /^\s*webpackChunkName\b/,
  /^\s*@vite-ignore\b/,
];

const isDirective = value => ALLOWED.some(pattern => pattern.test(value));

const report = (context, node) => {
  context.report({
    node,
    messageId: 'noComments',
    loc: node.loc,
  });
};

const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Proíbe comentários no código; contexto duradouro vai para NOTES.md ou README.',
    },
    schema: [],
    messages: {
      noComments:
        'Comentário no código. Remova, ou mova o contexto para NOTES.md / README se for duradouro.',
    },
  },

  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    const isShebang = comment =>
      comment.type === 'Shebang' ||
      (comment.range?.[0] === 0 && comment.value.startsWith('!'));

    const checkScript = () => {
      for (const comment of sourceCode.getAllComments()) {
        if (isShebang(comment) || isDirective(comment.value)) continue;
        report(context, comment);
      }
    };

    const checkTemplate = () => {
      const services = sourceCode.parserServices;
      const store = services?.getTemplateBodyTokenStore?.();
      const templateBody = sourceCode.ast.templateBody;

      if (!store || !templateBody) return;

      const tokens = store.getTokens(templateBody, { includeComments: true });

      for (const token of tokens) {
        const isComment =
          token.type === 'HTMLComment' ||
          token.type === 'Block' ||
          token.type === 'Line';

        if (isComment && !isDirective(token.value ?? '')) {
          report(context, token);
        }
      }
    };

    return {
      'Program:exit'() {
        checkScript();
        checkTemplate();
      },
    };
  },
};

const cssRule = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Proíbe comentários em CSS.' },
    schema: [],
    messages: {
      noComments:
        'Comentário no CSS. Remova, ou mova o contexto para NOTES.md / README se for duradouro.',
    },
  },

  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    return {
      'StyleSheet:exit'() {
        const comments =
          sourceCode.comments ?? sourceCode.getAllComments?.() ?? [];

        for (const comment of comments) {
          if (!isDirective(comment.value ?? '')) report(context, comment);
        }
      },
    };
  },
};

export const noCommentsPlugin = {
  rules: {
    'no-comments': rule,
    'no-css-comments': cssRule,
  },
};
