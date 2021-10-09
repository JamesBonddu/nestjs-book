// github.com/conventional-changelog/commitlint
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'upd',
        'feat',
        'fix',
        'docs',
        'test',
        'perf',
        'style',
        'chore',
        'sample',
        'refactor'
      ]
    ]
  }
}
