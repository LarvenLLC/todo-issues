# todo-issues javascript action

This action reads your TODO or TODO.md file at the root of your repo and creates issues respectively.

## Inputs

### `path`

**Required** Path to TODO md. Default `"./TODO.md"`.

## Outputs

### `issues`

Number of issues created.

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
who-to-greet: 'Mona the Octocat'
