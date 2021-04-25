import { RawUser, User } from '@interfaces/github'

export const parseUser = (rawUsers: Array<RawUser>): Array<User> =>
  rawUsers
    ? rawUsers.map(raw => ({
        avatar: raw.avatarUrl,
        bio: raw.bio,
        company: raw.company,
        contributions: raw.repositoriesContributedTo.totalCount,
        createdAt: new Date(raw.createdAt).getFullYear().toString(),
        email: raw.email,
        followers: raw.followers.totalCount,
        githubUrl: raw.url,
        id: raw.id,
        location: raw.location,
        name: raw.name,
        stars: raw.starredRepositories.totalCount,
        status: raw.status,
        twitter: raw.twitterUsername,
        username: raw.login,
        websiteUrl: raw.websiteUrl,
      }))
    : []
