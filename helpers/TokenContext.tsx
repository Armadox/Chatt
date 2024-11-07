"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TokenContextType {
    token: string | null;
    setToken: (token: string) => void;
    name: string | null;
    setName: (name : string) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [name, setName] = useState<string | null>('');

    return (
        <TokenContext.Provider value={{ token, setToken, name, setName }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};