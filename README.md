To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install --save react-use-confirm-alert
    $ yarn add react-use-confirm-alert

## Examples

Here is a simple example of react-use-confirm-alert being used in a component:

```jsx
import { ConfirmAlertProvider } from "react-use-confirm-alert";

export default function App() {
    return (
        <ConfirmAlertProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/books/add" element={<AddBook/>}/>
                    <Route path="/books/edit/:bookId" element={<EditBook/>}/>
                </Routes>
            </Router>
        </ConfirmAlertProvider>
    );
}


import {useConfirmAlert} from "react-use-confirm-alert";

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
    );
}
```