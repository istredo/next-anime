import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faGithub,
	faGoogle,
	faVk,
	faYandex,
} from '@fortawesome/free-brands-svg-icons'

export const AuthSocials = ({
	signOAuthHandler,
}: {
	signOAuthHandler: VoidFunction
}) => (
	<div className='cart-body__socials'>
		<button
			className='btn-reset socials__btn gh-color'
			onClick={signOAuthHandler}>
			<FontAwesomeIcon icon={faGithub} beat />
		</button>
		<button
			className='btn-reset socials__btn g-color'
			onClick={signOAuthHandler}>
			<FontAwesomeIcon icon={faGoogle} shake />
		</button>
		<button
			className='btn-reset socials__btn y-color'
			onClick={signOAuthHandler}>
			<FontAwesomeIcon icon={faYandex} bounce />
		</button>
		<button
			className='btn-reset socials__btn vk-color'
			onClick={signOAuthHandler}>
			<FontAwesomeIcon icon={faVk} shake />
		</button>
	</div>
)
