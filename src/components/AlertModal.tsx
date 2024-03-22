import useConfirmAlert from '../hooks/useConfirmAlert'

interface Props {
    title?: string
    message?: string
    confirmButtonLabel?: string
    cancelButtonLabel?: string
    onConfirm?: () => Promise<unknown> | unknown
    onCancel?: () => Promise<unknown> | unknown
}

export default function AlertModal(props: Props) {
    const confirmAlert = useConfirmAlert()

    async function handleDelete() {
        confirmAlert({ onConfirm: () => console.log('Confirmed') })
        const isConfirmed = await confirmAlert({ ...props })

        if (isConfirmed) {
            //delete the book
        }
    }

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}
