import { RawUser, User } from '@interfaces/github'

export const parseUser = (rawUsers: Array<RawUser>): Array<User> => {
  // When app first loads this will evaluate to undefined.
  if (typeof rawUsers === 'undefined') {
    return []
  }
  return rawUsers.reduce((acc, user) => {
    // Parse out empty object.
    // QUESTION: Why am I getting back empty datasets from GitHub?
    if (JSON.stringify(user) === JSON.stringify({})) {
      return acc
    }
    // Parse the User data.
    acc.push({
      avatar: user.avatarUrl,
      bio: user.bio,
      company: user.company,
      contributions: user.repositoriesContributedTo.totalCount,
      createdAt: new Date(user.createdAt).getFullYear().toString(),
      email: user.email,
      followers: user.followers.totalCount,
      githubUrl: user.url,
      id: user.id,
      location: user.location,
      name: user.name,
      stars: user.starredRepositories.totalCount,
      status: user.status,
      twitter: user.twitterUsername,
      username: user.login,
      websiteUrl: user.websiteUrl,
    })
    return acc
  }, [] as Array<User>)
}
