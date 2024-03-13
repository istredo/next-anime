import { IAccordionProps } from '@/types/modules'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const Accordion = ({
	children,
	title,
	titleClass,
	rotateIconClass
}: IAccordionProps) => {
	const [visible, setVisible] = React.useState(false)

	const toggleAccordion = () => setVisible(!visible)
	return (
		<>
			<motion.button
				initial={false}
				onClick={toggleAccordion}
				className={`btn-reset ${titleClass} ${rotateIconClass ? (visible ? rotateIconClass : '') : ''
					}`}
			>
				{title}
			</motion.button>
			<AnimatePresence initial={false}>
				{visible && (
					<motion.div
						key='content'
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						style={{ overflow: 'hidden' }}
						transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default Accordion
