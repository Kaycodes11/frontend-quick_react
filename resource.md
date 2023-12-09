[ https://dev.to/pappijx effortlessly-setting-up-your-react-project-with-vite-husky-typescript-and-eslint-a-comprehensive-guide-n5l ]

[ https://www.youtube.com/watch?v=cchqeWY0Nak&ab_channel=CodingGarden ]

Since, `ESLINT` uses `prettier` within i.e. `.eslintrc.cjs` and so no need to configure any npm command for it like eslint"


To know eslint error , run "npm run lint" or just use "npm run lint:fix" to fix the ESLINT error and format the whole project


## husky 

1. npm install -D husky and add a script within package.json "prepare": "husky install"

2. npm run prepare : it will create .husky folder at root

3. npx husky add .husky/pre-commit "npx lint-staged" : it will create the pre-commit hook within .husky folder

4. add lint-staged property within package.json

5. now just add, commit and push to github repo