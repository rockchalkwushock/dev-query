import { RawUser, User } from '@interfaces/github'

export const parseUser = (node: RawUser): User => {
  return {
    avatar: node!.avatarUrl,
    bio: node!.bio,
    company: node!.company,
    contributions: node!.repositoriesContributedTo.totalCount,
    createdAt: new Date(node!.createdAt).getFullYear().toString(),
    email: node!.email,
    followers: node!.followers.totalCount,
    githubUrl: node!.url,
    id: node!.id,
    location: node!.location,
    name: node!.name,
    stars: node!.starredRepositories.totalCount,
    status: node!.status,
    twitter: node!.twitterUsername,
    username: node!.login,
    websiteUrl: node!.websiteUrl,
  }
}
