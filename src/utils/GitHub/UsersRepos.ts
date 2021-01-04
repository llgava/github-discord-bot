import { Octokit } from "@octokit/core";
import _ from 'lodash';

export class UsersRepos extends Octokit {
  public username: string;
  public repos_amount: Promise<number> | number;
  public repos_names: string[];

  constructor(username: string) {
    super({ auth: process.env.GITHUB_TOKEN });

    this.username = username;
    this.repos_amount = this.getNumberOfRepos();
  }

  private async getNumberOfRepos() {
    await this.request("GET /users/{username}/repos", {
      username: this.username
    }).then(repo => this.repos_amount = _.size(repo.data));

    return this.repos_amount;
  }
}