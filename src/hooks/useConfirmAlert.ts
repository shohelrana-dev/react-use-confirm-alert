import { useContext } from 'react'
import { ConfirmAlertContext } from '../providers/ConfirmAlertProvider'

export default function useConfirmAlert() {
    const context = useContext(ConfirmAlertContext)

    if (!context) {
        throw new Error('Please Use ConfirmAlertProvider in parent component.')
    }

    return context
}
