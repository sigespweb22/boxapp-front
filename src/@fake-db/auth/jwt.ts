// ** JWT import
import jwt from 'jsonwebtoken'

// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { UserDataType } from 'src/context/types'

const users: UserDataType[] = [
  {
    id: "1",
    role: ['admin'],
    password: 'admin',
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'admin@materio.com'
  },
  {
    id: "2",
    role: ['client'],
    password: 'client',
    fullName: 'Jane Doe',
    username: 'janedoe',
    email: 'client@materio.com'
  },
  {
    id: "8e445865-a24d-4543-a6c6-9443d048cdb9",
    role: ['USER_LIST', 'suporte'],
    password: 'client',
    fullName: 'Alan Rezende',
    username: 'alan.rezende@boxtecnologia.com.br',
    email: 'alan.rezende@boxtecnologia.com.br'
  },
  {
    id: "4",
    role: ['suporte'],
    password: 'box@#123',
    fullName: 'Suporte Box',
    username: 'suporte@boxtecnologia.com.br',
    email: 'suporte@boxtecnologia.com.br'
  },
]

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
  refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767'
}

mock.onPost('/jwt/login').reply(request => {
  debugger;
  const { email, password } = JSON.parse(request.data)

  let error = {
    email: ['Algo deu errado']
  }

  const user = users.find(u => u.email === email && u.password === password)

  if (user) {
    
    const accessToken = jwt.sign( { nameid: user.id, name: user.email, roles: ["MASTER", "dashboard-client-service-documentation_list", "ACCOUNT-PROFILE_GET"], nbf: 1659380480, exp: 1659985280 }, jwtConfig.secret)

    const response = {
      accessToken
    }

    return [200, response]
  } else {
    error = {
      email: ['E-mail/Senha inválidos']
    }

    return [400, { error }]
  }
})

mock.onPost('/jwt/register').reply(request => {
  if (request.data.length > 0) {
    const { email, password, username } = JSON.parse(request.data)
    const isEmailAlreadyInUse = users.find(user => user.email === email)
    const isUsernameAlreadyInUse = users.find(user => user.username === username)
    const error = {
      email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
      username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
    }

    if (!error.username && !error.email) {
      const { length } = users
      let lastIndex = 0
      if (length) {
        lastIndex = users[length - 1].id
      }
      const userData = {
        id: lastIndex + 1,
        email,
        password,
        username,
        avatar: null,
        fullName: '',
        role: 'admin'
      }

      users.push(userData)

      const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret)

      const user = { ...userData }
      delete user.password

      const response = { accessToken }

      return [200, response]
    }

    return [200, { error }]
  } else {
    return [401, { error: 'Invalid Data' }]
  }
})

mock.onGet('/auth/me').reply(config => {
  // @ts-ignore
  debugger;
  const token = config.headers.Authorization as string

  // get the decoded payload and header
  const decoded = jwt.decode(token, { complete: true })

  if (decoded) {
    // @ts-ignore
    const { nameid: nameid } = decoded.payload

    const a = JSON.stringify(users.find((u: UserDataType) => u.id === nameid))
    const userData = JSON.parse(a)

    delete userData.password

    return [200, { userData }]
  } else {
    return [401, { error: { error: 'Invalid User' } }]
  }
})