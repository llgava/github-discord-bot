import { Octokit } from "@octokit/core";

export class GitHub extends Octokit {
  constructor() {
    super({ auth: process.env.GITHUB_TOKEN });
  }
}
