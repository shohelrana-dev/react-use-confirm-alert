To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install --save react-use-confirm-alert
    $ yarn add react-use-confirm-alert

## Examples

Here is a simple example of react-use-confirm-alert being used in a component:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfirmAlertProvider } from 'react-use-confirm-alert'
import App from './App'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfirmAlertProvider>
            <App />
        </ConfirmAlertProvider>
    </React.StrictMode>
)
```
```jsx
import { useConfirmAlert } from "react-use-confirm-alert"

export default function Book() {
    const confirmAlert = useConfirmAlert()

    async function handleDelete() {
        const isConfirmed = await confirmAlert({
            title: "Are you sure?",
            message: "This action cannot be undone"
        })

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
```