import React from 'react'
import { AuthRegistration } from './AuthRegistration'
import { AuthLogin } from './AuthLogin'

export const AuthPopup = () => {
	const [isAuthSwitched, setIsAuthSwitched] = React.useState(false)
	const [isSignInActive, setIsSignInActive] = React.useState(false)
	const [isSignupActive, setIsSignupActive] = React.useState(true)

	const toggleAuth = () => {
		setIsAuthSwitched(!isAuthSwitched)
		setIsSignInActive(!isSignInActive)
		setIsSignupActive(!isSignupActive)
	}

	return (
		<div className='container auth-popup'>
			<div>
				<div className='starsec' />
				<div className='starthird' />
				<div className='starfourth' />
				<div className='starfifth' />
			</div>
			<div className={`auth-popup__card ${isAuthSwitched ? 'switched' : ''}`}>
				<div className='auth-popup__card__inner'>
					<AuthRegistration
						toggleAuth={toggleAuth}
						isSideActive={isSignupActive}
					/>
					<AuthLogin
						toggleAuth={toggleAuth}
						isSideActive={isSignInActive}
					/>
				</div>
			</div>
		</div>
	)
}
