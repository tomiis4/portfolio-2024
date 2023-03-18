# Typescript
Repository full of my Javascript/Typescript projects

### Favorite projects
- [x] CLI
    - <a href='https://github.com/tomiis4/TypeScript/tree/main/CLI/Tools/cli-text-editor'> cli-text-editor </a>

- [x] HTML
    - <a href='https://github.com/tomiis4/TypeScript/tree/main/Html/Algorithms/bubble-sort'> bubble-sort </a>
    - <a href='https://github.com/tomiis4/TypeScript/tree/main/Html/Games/flappy-bird'> flappy-bird </a>
    - <a href='https://github.com/tomiis4/TypeScript/tree/main/Html/Games/snake'> snake </a>
    - <a href='https://github.com/tomiis4/TypeScript/tree/main/Html/Games/runner'> snake </a>
    - <a href='https://github.com/tomiis4/TypeScript/tree/main/Html/Games/isometric'> isometric </a>

# TypeScript Cheatsheet
## Types
```ts
// set type
let variable: <type>

// basic
string
number
boolean
bigint

// special
any // can be any type
unknow // once is assigned type, it can't be changed to other

// function (take 2 arguments type number and return number)
function add(arg1: number, arg2: number): number {
    // ...
}
```
## Custom type
```ts
// object
type ObjectType = {
    name: string,
    id: number
}

// array
type ArrayType = [number];
type ArrayType2 = number[];

// custom
type CustomType = "red" | "green" | "blue";
```

## ReactJs
```ts
// useState
const [x, setX] = useState<type>();
```
