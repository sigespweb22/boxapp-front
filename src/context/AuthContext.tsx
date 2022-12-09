// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Api Services
import accountApiServices from 'src/@api-center/account/accountApiService'
import authConfig from 'src/configs/auth'

// ** Api services
import apiAccount from 'src/@api-center/account/accountApiService'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Toast
import { toast, ToastContent } from 'react-toastify';

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setIsInitialized(true)
      const storedToken = window.localStorage.getItem(accountApiServices.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await axios
          .get(accountApiServices.me, {
            headers: {
              Authorization: "Bearer " + storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(accountApiServices.loginEndpoint, params)
      .then(async res => {
        window.localStorage.setItem(accountApiServices.storageTokenKeyName, res.data.userData.accessToken)
        
        const returnUrl = router.query.returnUrl
        setUser({ ...res.data.userData })

        await window.localStorage.setItem('userData', JSON.stringify(res.data.userData))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })
      .then(() => {
        axios
          .get(apiAccount.me, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem(apiAccount.storageTokenKeyName)!
            }
          })
          .then(async response => {
            const returnUrl = router.query.returnUrl
            setUser({ ...response.data.userData })

            await window.localStorage.setItem('userData', JSON.stringify(response.data.userData))

            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

            router.replace(redirectURL as string)
          })
      })
      .catch(err => {
        if (typeof err.response.data != 'undefined' &&
            err.response.data.errors != 'undefined' && 
            err.response.data.errors.length > 0)
        {
          err.response.data.errors.forEach((er: ToastContent) => {
            toast.error(er)
          });
        } else {
          if (errorCallback) errorCallback(err)
        }
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(accountApiServices.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
