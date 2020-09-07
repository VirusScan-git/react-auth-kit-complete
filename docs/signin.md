#Sign In

> Implement Sign In on your React App

React Auth JWT has easy to implement Sign In procedures.

It supports both [`Hooks`](https://reactjs.org/docs/hooks-intro.html) and
[`Higher Order Component`](https://reactjs.org/docs/higher-order-components.html)
for both Functional Components and Class-based Components

## Sign In using Hooks

Sign In using Hooks need `useSignIn` hook

```js
import { useSignIn } from 'react-auth-jwt'
```
### Demo
```jsx
import { useSignIn } from 'react-auth-jwt'

const SignInComponent = () => {
    const signIn = useSignIn()
    ...
    const onSubmit = (e) => {
        ...
        if(signIn(token, expiresOn, authUserState)){
            // Redirect or do-something
        }else {
            //Throw error
        }
    }

    return (
        ...
    )
}
```

<details>
    <summary>Full Code</summary>
    <br>


```jsx
import React from "react"
import axios from 'axios'
import { useSignIn } from 'react-auth-jwt'

const SignInComponent = () => {
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({email: '', password: ''})

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', formData)
            .then((res)=>{
                if(res.status === 200){
                    if(signIn(res.data.token, res.data.expiresOn, res.data.authUserState)){
                        // Redirect or do-something
                    }else {
                        //Throw error
                    }
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <input type={"email"} onChange={(e)=>setFormData({...formData, email: e.target.value})}/>
            <input type={"password"} onChange={(e)=>setFormData({...formData, password: e.target.value})}/>

            <button>Submit</button>
        </form>
    )
}
```
</details>

## Sign In using Higher Order Component

Sign In using Higher Order Component using `withSignIn`

```js
import { withSignIn } from 'react-auth-jwt'
```

### Demo
```jsx
import { withSignIn } from 'react-auth-jwt'

class signInComponent extends React.Component {

    const onSubmit = (e) => {
        ...
        if(this.props.signIn(token, expiresOn, authUserState)){
            // Redirect or do-something
        }else {
            //Throw error
        }
    }

    render(){
        ...
    }
}

export default withSignIn(signInComponent)
```

<details>
    <summary>Full Code</summary>
    <br>

```jsx
import React from 'react'
import axios from 'axios'
import { withSignIn } from 'react-auth-jwt'

class signInComponent extends React.Component {
    state={email: '', password: ''}

    onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', this.state)
            .then((res)=>{
                if(res.status === 200){
                    if(this.props.signIn(res.data.token, res.data.expiresOn, res.data.authUserState)){
                        // Redirect or do-something
                    }else {
                        //Throw error
                    }
                }
            })
    }

    render(){
        return (
            <form onSubmit={onSubmit}>
                <input type={"email"} onChange={(e)=>this.setState({...this.state, email: e.target.value})}/>
                <input type={"password"} onChange={(e)=>this.setState({...this.state, password: e.target.value})}/>

                <button>Submit</button>
            </form>
        )
    }
}

export default withSignIn(signInComponent)

```

</details>
## API
- [`useSignIn()`](/api)
- [`withSignIn()`](/api)
