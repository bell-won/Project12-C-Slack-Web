import Request from '../shared/utils/request'

export const signOut = async () => {
  const data = await Request.DELETE('/api/user/sign-out')
  return data
}
