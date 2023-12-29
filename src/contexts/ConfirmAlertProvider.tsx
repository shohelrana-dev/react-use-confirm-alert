import { createContext, PropsWithChildren, useState } from "react"
import { Modal, useModal } from "react-minimal-modal"
import { Oval as Loading } from 'react-loader-spinner'
import classes from "../styles/style.module.css"


export interface AlertOptions {
    title: string
    message?: string
    confirmButtonLabel?: string
    cancelButtonLabel?: string
    onConfirm?: () => void
}

type TPromise = { resolve: (value: boolean) => void } | null

type TValue = ((options: AlertOptions) => Promise<boolean>) | null

export const ConfirmAlertContext = createContext<TValue>(null)

export default function ConfirmAlertProvider({ children }: PropsWithChildren) {
    const [options, setOptions] = useState<AlertOptions>({
        title: '', confirmButtonLabel: 'Yes', cancelButtonLabel: 'Cancel'
    })
    const { isVisible, toggle } = useModal()
    const [promise, setPromise] = useState<TPromise>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { onConfirm, confirmButtonLabel, cancelButtonLabel, title, message } = options

    function confirmAlert(options: AlertOptions): Promise<boolean> {
        setOptions((prevState) => ({ ...prevState, ...options }))
        toggle()
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
                toggle()
            } catch (err: any) {
                console.error(err?.message)
            } finally {
                setIsLoading(false)
            }
        } else {
            promise?.resolve(true)
            toggle()
        }
    }

    function handleCancel() {
        toggle()
        promise?.resolve(false)
    }

    return (
        <ConfirmAlertContext.Provider value={confirmAlert}>
            {children}
            <Modal visible={isVisible} toggle={toggle} title={title} hideIcon className={classes.modalCustom}>
                <p className={classes.message}>{message}</p>
                <div className={classes.footer}>
                    <button className={classes.buttonCancel} onClick={handleCancel}>
                        {cancelButtonLabel}
                    </button>
                    <button className={classes.buttonConfirm} onClick={handleConfirm} disabled={isLoading}>
                        <Loading
                            color="#fff"
                            visible={isLoading}
                            secondaryColor="#ddd"
                            width={18}
                            height={18}
                            strokeWidth={7}
                        />
                        {confirmButtonLabel}
                    </button>
                </div>
            </Modal>
        </ConfirmAlertContext.Provider>
    )
}
