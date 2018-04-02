# PropTypes to Flow codemod

Thanks to [https://github.com/mikhail-hatsilau/proptypes-to-flow-codemod](https://github.com/mikhail-hatsilau/proptypes-to-flow-codemod) which was used as a starter.

## Setup and usage
Before usage of the codemod you should install [jscodeshift](https://github.com/facebook/jscodeshift#install) first.

1. Clone repo
`git clone https://github.com/lukeapage/set-el-to-react-create-ref-codemod.git`

2. Run `npm install` inside codemod directory
3. Run `npm run build` to transpile javascript
4. Run `jscodeshift -t set-el-to-react-create-ref/dist/index.js <path>`
