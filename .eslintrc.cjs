module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"jest",
		"import",
		"modules-newlines",
	],
	parserOptions: {
		project: "./tsconfig.json"
	},
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:jest/recommended",
		"plugin:jest/style",
		"airbnb-base",
		"prettier",
		"plugin:@typescript-eslint/recommended",
		"airbnb-typescript/base",
		"plugin:import/typescript",
	],
	env: {
		"jest/globals": true,
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [ ".ts", ".tsx" ]
		},
		"import/resolver": {
			"typescript": {
				"alwaysTryTypes": true,
			}
		}
	},
	rules: {
		"no-console": "off", // FOR TESTING ONLY

		/**
		 * Consistency & readability
		 */
		"class-methods-use-this": "off",
		"no-param-reassign": "off",
		curly: "error",
		"import/no-cycle": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "_.*" }],
		"import/no-extraneous-dependencies": ["error", { devDependencies: ["**/*.test.ts", "src/mocks/*"] }],
		"no-class-assign": "error",
		"no-var": "error",
		"prefer-arrow-callback": "error",
		"prefer-const": "error",
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/prefer-as-const": "error",
		"@typescript-eslint/naming-convention": [
			"error",
			{
				"selector": "variable",
				"types": ["boolean"],
				"format": ["PascalCase"],
				"prefix": ["is", "should", "has", "can", "did", "will"]
			},
			{
				"selector": ["variable", "function", "memberLike"],
				"format": ["camelCase"],
				"leadingUnderscore": "allow"
			},
			{
				"selector": "enumMember",
				"format": ["UPPER_CASE"]
			}
		],

		/**
		 * Styling
		 */
		"@typescript-eslint/quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
		"@typescript-eslint/type-annotation-spacing": "error",
		"array-bracket-spacing": ["error", "always"],
		"object-curly-newline": ["error", {
			multiline: true,
			minProperties: 2,
			consistent: true ,
		}],
		"object-property-newline": ["error", { allowAllPropertiesOnSameLine: false }],
		"comma-spacing": ["error", { before: false, after: true }],
		"comma-dangle": ["error", "always-multiline"],
		"key-spacing": ["error", { beforeColon: false, afterColon: true, mode: "strict", align: "colon" }],
		"object-curly-spacing": ["error", "always", { arraysInObjects: true } ],
		"function-paren-newline": ["error", { minItems: 2 }],
		"function-call-argument-newline": "error",
		"modules-newlines/import-declaration-newline": "error",
		"modules-newlines/export-declaration-newline": "error",
		"keyword-spacing": ["error", { before: true, after: true, }],
		"semi-spacing": "error",
		"semi-style": ["error", "last"],
		"sort-keys": "error",
		"sort-vars": "error",
		"switch-colon-spacing": ["error", { after: true, before: false }],
		"spaced-comment": "error",
		"arrow-spacing": ["error", { after: true, before: true }],
		camelcase: "error",
		"eol-last": "error",
		indent: ["error", 2],
		"multiline-ternary": ["error", "always"],
		"newline-per-chained-call": "error",
		"no-trailing-spaces": "error",
		"operator-assignment": "error",
		"operator-linebreak": "error",
		"max-len": ["error", { code: 100, ignoreTemplateLiterals: true }],
		"max-params": ["error", 4],
		"max-nested-callbacks": ["error", 3],
		"max-depth": ["error", 2],
		"padding-line-between-statements": [
			"error",
			{ blankLine: "always", prev: ["const", "let", "var"], next: "*" },
			{ blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
		],
		"space-before-blocks": "error",
	}
};
