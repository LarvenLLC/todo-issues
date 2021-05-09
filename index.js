const core = require("@actions/core");
const github = require("@actions/github");
const { promises: fs } = require("fs");

try {
  // get github token
  const gitHubToken = core.getInput("repo-token", { required: true });
  // get TODO path
  const path = core.getInput("path");
  const main = async () => {
    const content = await fs.readFile(path, "utf8");
    core.setOutput("content", content);
  };
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
