const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/codeEditor-remove-props');

ruleTester.run("codeEditor-remove-props", rule, {
  valid: [
    {
      code: `import { CodeEditor } from '@patternfly/react-core'; <CodeEditor />`,
    },
    {
      // No @patternfly/react-core import
      code: `<CodeEditor entryDelay exitDelay maxWidth position toolTipText />`,
    }
  ],
  invalid: [
    {
      code:   `import { CodeEditor } from '@patternfly/react-core'; <CodeEditor entryDelay exitDelay maxWidth position toolTipText />`,
      output: `import { CodeEditor } from '@patternfly/react-core'; <CodeEditor      />`,
      errors: ['entryDelay', 'exitDelay', 'maxWidth', 'position', 'toolTipText'].map(prop => {
        return {
          message: `${prop} has been removed for CodeEditor. This can instead be passed via the tooltipProps prop`,
          type: "JSXOpeningElement",
        }
      })
    }
  ]
});
