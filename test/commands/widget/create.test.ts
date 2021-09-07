import { expect, test } from '@oclif/test'

describe('widget:create', () => {
  test
    .stdout()
    .command(['widget:create'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['widget:create', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
