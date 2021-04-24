import { Maybe } from './helpers'

export interface Response {
  result: {
    nodes: Array<RawUser>
    pageInfo: PageInfo
    userCount: number
  }
}
export interface Variables {
  after?: string
  before?: string
  query: string
}

export interface PageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
}

interface RawUser {
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

type Count = {
  totalCount: number
}

type Status = {
  emoji: Maybe<string>
  message: Maybe<string>
}
