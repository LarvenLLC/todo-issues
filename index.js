const core = require("@actions/core");
const github = require("@actions/github");
const { promises: fs } = require("fs");

const main = async () => {
  try {
    /* INPUTS */
    // get github token
    const gitHubToken = core.getInput("repo-token", { required: true });
    // get TODO path
    const path = core.getInput("path");

    // get octokit
    const octokit = github.getOctokit(gitHubToken);
    // get content of TODO
    const {data: content} = await fs.readFile(path, "utf8");

    // get array of string lines from TODO file
    const contents = content.split("\n");
    // get todos from contents using "[ ] -" match
    const todos = contents.filter((content) =>
      content.match(/\s?\- \[ \]\s{0,}/)
    );

    // get repo info
    const { repository } = github.context.payload;
    const [owner, repo] = repository.full_name.split("/");

    // get existing issues
    const issueList = await octokit.issues.listForRepo({
      owner,
      repo,
      state: "open",
    });
    console.log(issueList)
    // existing issue titles
    const issues = issueList.map((issue) => issue.title);

    // list todos not found in issues (filter previously created issues)
    const list = [...new Set([...todos, ...issues])];

    // creating issue(s)
    console.log(`Creating ${list.length} issue(s)`);
    for (let index = 0; index < list.length; index++) {
      await octokit.issues.create({
        owner,
        repo,
        title: list[i],
      });
    }
    console.log(`Created ${list.length} issue(s)`);

    // output
    core.setOutput("issues", list.length);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main().catch((error) => core.setFailed(error.message));
