module.exports = {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    "pre-commit": "lint-staged",
    "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
  }
}
