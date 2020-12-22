import React, {useEffect, useState, createContext, useContext} from "react";

const LanguageDirectionContext = createContext({
    direction: 'ltr'
})

const LanguageDirectionProvider = ({ children }) => {
    const [direction, setDirection] = useState('ltr')

    const toggleDirection = () => {
        setDirection(direction === 'ltr' ? 'rtl' : 'ltr')
    }

    useEffect(() => {
        // use I18nManager to force direction and use asyncstorage to save the current direction to device.
    }, [direction])

    return (
        <LanguageDirectionContext.Provider value={{
            direction,
            toggleDirection
        }}>
            {children}
        </LanguageDirectionContext.Provider>
    )
}