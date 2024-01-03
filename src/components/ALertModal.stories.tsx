import type { Meta, StoryObj } from '@storybook/react'
import AlertModal from './AlertModal'
import ConfirmAlertProvider from '../contexts/ConfirmAlertProvider'

const meta: Meta<typeof AlertModal> = {
    title: 'Components/useConfirmAlert',
    component: AlertModal,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AlertModal>

export const Default: Story = {
    args: {
        title: 'Are you sure?',
        message: 'This action cannot be undone',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        onConfirm: async () => {
            await new Promise(resolve => {
                setTimeout(function () {
                    resolve(null)
                }, 2000)
            })
            alert('Confirmed')
        },
        onCancel: () => {
            alert('Cancel')
        },
    },
    render: props => {
        return (
            <ConfirmAlertProvider>
                <AlertModal {...props} />
            </ConfirmAlertProvider>
        )
    },
}
