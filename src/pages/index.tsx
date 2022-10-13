// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: string) => {
  if (role === 'Master') return '/dashboards/cliente'
  else return '/dashboards/controle-acesso'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    debugger
    if (auth.user && auth.user.applicationUserGroups.length >= 1) {
      const homeRoute = getHomeRoute('Master')

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
