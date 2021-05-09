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
    const content = await fs.readFile(path, "utf8");
    console.log("content:", content);

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
    const issues = await octokit.issues.listForRepo({
      owner,
      repo,
      state: "open",
    });

    // list todos not found in issues
    const list = issues.filter((issue) => todos.includes(issue.title));

    // filter previously created issues
    for (let index = 0; index < todos.length; index++) {
      todos;
    }

    // create issue
    console.log("Creating issues");
    await octokit.issues.create({
      owner,
      repo,
      title,
    });

    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput("who-to-greet");
    console.log(`Hello ${nameToGreet}!`);
    const time = new Date().toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
    core.setOutput("issue", response.data.key);
  } catch (error) {
    core.setFailed(error.message);
    process.exit(1);
  }
};

main().catch((error) => core.setFailed(error.message));
