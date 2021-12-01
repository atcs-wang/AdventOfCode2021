# Advent of Code 2021

This is my attempts at the Advent of Code 2021 challenges.

My goal is to use TypeScript, which is a new language for me. I will document the process of beginning with TS here.

## First steps with TS 

Installed TS via npm as a local development dependency:

    `npm install typescript --save-dev`

> Alternatively, we could install globally with `npm install typescript -g`.  Installing locally requires using `npx tsc` instead of just `tsc` in the terminal.

A default tsconfig.json is created with:

    `tsc --init`

TS files can be compiled to JS with:

    `tsc sample.ts`

## Setting up TS project structure

It is nice to enforce some separation in the project structure between TS and JS files.

We'll put all TS files in a folder called `src` and have all emitted JS files in a folder called `js`. 
```
projectRoot
├───js
│   └── sample.js
├───src
│   └── sample.ts
└── tsconfig.json
```
Some changes should be made to `tsconfig.json`:

```json
{
  "include": ["./src/**/*"],
  "exclude": ["node_modules/**/*"],
  "compilerOptions": {
    ...
    "outDir": "js",
    ...
  }
}

```

As a result, now the general compile command will compile everything in the `src` folder and emit the JS in matching structures in the `js` folder.

```
tsc
```

## Typing in npm :

One last step before really getting going - node functions like `require` don't have 
TypeScript types built in. We can install them easily with:

(VSCode also complains...)
https://stackoverflow.com/a/46819440

  `npm install --save-dev @types/node`

Additionally / alternatively (???) Update these lines in the tsconfig.json
```json
    "typeRoots": ["node_modules/@types"],                                  /* Specify multiple folders that act like `./node_modules/@types`. */
    "types": ["node"],                                      /* Specify type package names to be included without being referenced in a source file. */
```

It seems using the ES6 `import` notation plays more nicely with auto-complete for modules like "fs" than the `require()` syntax
```ts
import * as fs from 'fs';
// vs:
const fs = require('fs');
```