import { Maybe } from './helpers'
export interface Response {
  result: {
    nodes: Array<RawUser>
    pageInfo: PageInfo
    userCount: number
  }
}

export interface ParsedResponse {
  count: number
  pageInfo: PageInfo
  users: Array<User>
}
export interface Variables {
  after?: Maybe<string>
  before?: Maybe<string>
  first?: Maybe<number>
  last?: Maybe<number>
  query: string
}

export interface PageInfo {
  endCursor?: Maybe<string>
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: Maybe<string>
}

export interface RawUser {
  avatarUrl: string
  bio: Maybe<string>
  company: Maybe<string>
  createdAt: string
  email: string
  followers: Count
  id: string
  location: Maybe<string>
  login: string
  name: Maybe<string>
  repositoriesContributedTo: Count
  starredRepositories: Count
  status: Maybe<Status>
  twitterUsername: Maybe<string>
  url: string
  websiteUrl: Maybe<string>
}

export interface User
  extends Omit<
    RawUser,
    | 'avatarUrl'
    | 'followers'
    | 'login'
    | 'repositoriesContributedTo'
    | 'starredRepositories'
    | 'twitterUsername'
    | 'url'
  > {
  avatar: string
  contributions: number
  followers: number
  githubUrl: string
  stars: number
  twitter: Maybe<string>
  username: string
}

type Count = {
  totalCount: number
}

type Status = {
  emoji: Maybe<string>
  message: Maybe<string>
}
