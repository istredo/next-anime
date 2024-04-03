import Link from "next/link"
import Image from 'next/image'
import logo from '@/public/img/logo.svg'

const Logo = () => (
	<Link className="logo" href='/'>

		<Image className='logo__img' src={logo} alt="Site Logo" />
	</Link>
)
export default Logo
