import React, {useEffect, useState} from 'react'
import TokenObject from './TokenObject'
import {TokenInterface, TokenObjectParamsInterface,} from "./types";

interface AuthProviderProps extends TokenObjectParamsInterface {
    children: React.ReactChildren
}

/**
 * AuthContextInterface
 *
 * authState - Stores the value of authentication State
 * setAuthState - Sets the authState Value
 */
declare interface AuthContextInterface {
    authState: TokenInterface
    setAuthState: React.Dispatch<React.SetStateAction<TokenInterface>>
}

const AuthContext = React.createContext<AuthContextInterface | null>(null)

/**
 * AuthProvider - The Authentication Context Provider
 *
 * @param children
 * @param authStorageName
 * @param authStorageType
 * @param authTimeStorageName
 * @param cookieDomain
 * @param cookieSecure
 * @param stateStorageName
 * @constructor
 */
const AuthProvider: React.FunctionComponent<AuthProviderProps> =
    ({
         children,
         authStorageType,
         authStorageName,
         authTimeStorageName,
         stateStorageName,
         cookieDomain,
         cookieSecure,
     }) => {
        if (authStorageType === "cookie") {
            if (!(!!cookieSecure && !!cookieDomain)) {
                throw new Error("authStorageType 'cookie' requires 'cookieDomain' and 'cookieSecure' in AuthProvider")
            }
        }

        const tokenObject = new TokenObject({
            authTimeStorageName,
            authStorageType,
            authStorageName,
            cookieDomain,
            cookieSecure,
            stateStorageName
        })
        const [authState, setAuthState] = useState<TokenInterface>(
            tokenObject.initialToken()
        )

        useEffect(() => {
            tokenObject.syncTokens(authState)
        }, [authState])

        return (
            <AuthContext.Provider value={{authState, setAuthState}}>
                {children}
            </AuthContext.Provider>
        )
    }

AuthProvider.defaultProps = {
    authStorageType: "cookie",
    authStorageName: "_auth_token",
    authTimeStorageName: "_auth_time",
    stateStorageName: "_auth_state",
    cookieSecure: true
}


export default AuthProvider
const AuthContextConsumer = AuthContext.Consumer
export {AuthContext, AuthContextConsumer}
