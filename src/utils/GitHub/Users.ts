import { GitHub } from './GitHub';
import { UsersRequest } from '../../models/UsersRequest';
import { ResponseError } from './ResponseError';
import { NULL_COMPANY, NULL_DESCRIPTION } from '../../config/messages.json';

export class Users extends GitHub {
  private error: ResponseError
  private users: UsersRequest;
  private username: string;

  private canBeNull: {
    company: string;
  }

  constructor(username: string) {
    super();

    this.username = username;
  }

  /* Return information about a user from GitHub. */
  public getUsersData() {
    return new Promise<UsersRequest>(async (resolve, reject) => {
      await this.request('GET /users/{username}', {
        username: this.username
      }).then(req => {

        this.users = {
          name: req.data.name !== null ? req.data.name : req.data.login,
          company: req.data.company !== null ? req.data.company : NULL_COMPANY,
          username: req.data.login,
          biography: req.data.bio !== null ? req.data.bio : NULL_DESCRIPTION,
          followers: req.data.followers,
          following: req.data.following,
          avatar_url: req.data.avatar_url,
          profile_url: req.data.html_url,
          gists_amount: req.data.public_gists,
          repos_amount: req.data.public_repos
        }

        resolve(this.users);
      })
      .catch((req) => {
        this.error = {
          status: req.status,
          message: `O usuário ${this.username} não foi encontrado`
        }

        reject(this.error);
      })
    })
  }
}