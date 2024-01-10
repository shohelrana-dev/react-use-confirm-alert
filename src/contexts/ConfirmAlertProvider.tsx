import { createContext, PropsWithChildren, useState } from 'react'
import { Modal, useToggle } from 'react-minimal-modal'
import classes from '../styles/style.module.css'

export interface AlertOptions {
	title?: string
	message?: string
	confirmButtonLabel?: string
	cancelButtonLabel?: string
	onConfirm?: () => Promise<void> | void
	onCancel?: () => Promise<void> | void
}

type TPromise = { resolve: (value: boolean) => void } | null

type TValue = ((options: AlertOptions) => Promise<boolean>) | null

export const ConfirmAlertContext = createContext<TValue>(null)

export default function ConfirmAlertProvider({ children }: PropsWithChildren) {
	const [options, setOptions] = useState<AlertOptions>({
		title: '',
		confirmButtonLabel: 'Confirm',
		cancelButtonLabel: 'Cancel',
	})
	const [isOpen, toggle] = useToggle()
	const [promise, setPromise] = useState<TPromise>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { onConfirm, onCancel, confirmButtonLabel, cancelButtonLabel, title, message } = options

	function confirmAlert(options: AlertOptions): Promise<boolean> {
		setOptions(prevState => ({ ...prevState, ...options }))
		toggle()
		return new Promise<boolean>(resolve => {
			setPromise({ resolve })
		})
	}

	async function handleConfirm() {
		if (typeof onConfirm === 'function') {
			setIsLoading(true)

			await onConfirm()
			promise?.resolve(true)
			toggle()

			setIsLoading(false)
		} else {
			promise?.resolve(true)
			toggle()
		}
	}

	async function handleCancel() {
		if (typeof onCancel === 'function') {
			await onCancel()
			promise?.resolve(true)
			toggle()
		} else {
			promise?.resolve(false)
			toggle()
		}
	}

	return (
		<ConfirmAlertContext.Provider value={confirmAlert}>
			{children}
			<Modal open={isOpen} toggle={toggle} width={450} hideIcon>
				<h2 className={classes.title}>{title}</h2>
				<p className={classes.message}>{message}</p>
				<div className={classes.footer}>
					<button className={classes.button} onClick={handleCancel} disabled={isLoading}>
						{cancelButtonLabel}
					</button>
					<button
						className={`${classes.button} ${classes.buttonConfirm}`}
						onClick={handleConfirm}
						disabled={isLoading}
					>
						{isLoading ? <div className={classes.loader} /> : null}
						{confirmButtonLabel}
					</button>
				</div>
			</Modal>
		</ConfirmAlertContext.Provider>
	)
}
