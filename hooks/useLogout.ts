import { useEarthoOne } from '@eartho/one-client-react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '@/ctx/auth'

export const useUserLogout = () => {
	const router = useRouter()
	const { logout } = useEarthoOne()

	return () => {
		logout({ clientId: `${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}` })
		localStorage.removeItem('auth')
		checkAuth(false)
		router.push('/')
		window.location.reload()
	}
}
