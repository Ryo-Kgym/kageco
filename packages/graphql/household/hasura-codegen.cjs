const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

/*
echo ONEFORALL_GRAPHQL_ENDPOINT=https://hoge >> ../.env
*/

module.exports = {
  overwrite: true,
  schema: process.env.ONEFORALL_GRAPHQL_ENDPOINT,
  documents: "./household/**/**.graphql",
  generates: {
    "./household/generated/": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "typed",
      },
      plugins:
        ["typescript", "typescript-operations", "typed-document-node",
          {
            add: {
              content: "import { YYYY_MM_DD, YYYY_MM_DD_HH_MM_SS } from '@/util/date/date';"
            }
          }
        ],
      config: {
        onlyOperationTypes: true,
        enumsAsTypes: true,
        scalars: {
          bpchar: "string",
          date: "YYYY_MM_DD",
          timestamp: "string",
          numeric: "number",
          timestamptz: "YYYY_MM_DD_HH_MM_SS",
        },
        defaultScalarType: "unknown",
        avoidOptionals: {
          field: true,
          inputValue: true,
          object: true,
          defaultValue: true,
        },
      },
      hooks: {
        afterOneFileWrite: ["prettier --write"],
      },
    },
    // "./household/index.ts": {
    //   config: {
    //     onlyOperationTypes: true,
    //     withHooks: true,
    //   },
    //   plugins: ["typescript", "typescript-operations", "typescript-urql"],
    //   hooks: {
    //     afterOneFileWrite: ["prettier --write"],
    //   },
    // },
    // "./household/type.ts": {
    //   config: {
    //     enumsAsTypes: true,
    //     onlyOperationTypes: true,
    //   },
    //   plugins: ["typescript", "typescript-operations", "typed-document-node"],
    //   hooks: {
    //     afterOneFileWrite: ["prettier --write"],
    //   },
    // },
    // "./household/schema.json": {
    //   plugins: ["introspection"],
    // },
  },
};
