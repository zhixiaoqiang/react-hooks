module.exports = {
  './**/*.{js?(x),ts?(x)}': [
    'yarn lint',
    'git add',
  ],
}
