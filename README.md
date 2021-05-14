# todo-issues javascript action

This action reads your TODO or TODO.md file at the root of your repo and creates issues respectively.

## Inputs

### `path`

**Required** Path to TODO.md or TODO => Default `"./TODO"`.

## Outputs

### `issues`

Number of issues created.

## Example usage

```
name: "Workflow"
on: [push]

jobs:
  todo_issues:
    runs-on: ubuntu-latest
    name: A job to create issues from todos
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Get todos action step
        id: issue
        uses: LarvenLLC/todo-issues@v1
        with:
          repo-token: ${{ secrets.GH_TOKEN }}
          path: "./TODO"
      # Use the output from the `issue` step
      - name: Get the number of issues created
        run: echo "Created ${{ steps.issue.outputs.issues }} issue(s)"
```
