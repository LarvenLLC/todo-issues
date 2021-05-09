# todo-issues javascript action

This action reads your TODO or TODO.md file at the root of your repo and creates issues respectively.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
who-to-greet: 'Mona the Octocat'
