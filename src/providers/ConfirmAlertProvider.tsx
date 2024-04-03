import { createContext, PropsWithChildren, useState } from 'react'
import { Modal } from 'react-minimal-modal'
import classes from '../styles/style.module.css'
//@ts-ignore
import loader from '../assets/loader.gif'

export interface AlertOptions {
    title?: string
    message?: string
    confirmButtonLabel?: string
    cancelButtonLabel?: string
    onConfirm?: () => Promise<unknown> | unknown
    onCancel?: () => Promise<unknown> | unknown
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
    const [isOpen, setIsOpen] = useState(false)
    const [promise, setPromise] = useState<TPromise>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { onConfirm, onCancel, confirmButtonLabel, cancelButtonLabel, title, message } = options

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    function confirmAlert(options: AlertOptions): Promise<boolean> {
        setOptions((prevState) => ({ ...prevState, ...options }))
        openModal()
        return new Promise<boolean>((resolve) => {
            setPromise({ resolve })
        })
    }

    async function handleConfirm() {
        if (typeof onConfirm === 'function') {
            setIsLoading(true)

            try {
                await onConfirm()
                promise?.resolve(true)
                setIsLoading(false)
                closeModal()
            } catch (err) {
                setIsLoading(false)
                throw err
            }
        } else {
            promise?.resolve(true)
            closeModal()
        }
    }

    async function handleCancel() {
        if (typeof onCancel === 'function') {
            try {
                await onCancel()
                promise?.resolve(false)
                setIsLoading(false)
                closeModal()
            } catch (err) {
                setIsLoading(false)
                throw err
            }
        } else {
            promise?.resolve(false)
            closeModal()
        }
    }

    return (
        <ConfirmAlertContext.Provider value={confirmAlert}>
            {children}

            <Modal open={isOpen} onOpenChange={setIsOpen} width={450} hideIcon>
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
                        {isLoading && <img src={loader} width={16} height={16} alt='loader image' />}
                        {confirmButtonLabel}
                    </button>
                </div>
            </Modal>
        </ConfirmAlertContext.Provider>
    )
}
