import { RawUser, User } from '@interfaces/github'

export const parseUser = (node: RawUser): User => {
  return {
    avatar: node!.avatarUrl,
    bio: node!.bio,
    company: node!.company,
    contributions: node!.repositoriesContributedTo
      ? node!.repositoriesContributedTo.totalCount
      : 0,
    createdAt: new Date(node!.createdAt).getFullYear().toString(),
    email: node!.email,
    followers: node!.followers ? node!.followers.totalCount : 0,
    githubUrl: node!.url,
    id: node!.id,
    location: node!.location,
    name: node!.name,
    stars: node!.starredRepositories ? node!.starredRepositories.totalCount : 0,
    status: node!.status,
    twitter: node!.twitterUsername,
    username: node!.login,
    websiteUrl: node!.websiteUrl,
  }
}
