import React, { createContext, useContext, useState, useEffect } from 'react';
// to get the stored user id and pass from local storage and to store it in local storage 
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Rehydrate from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('lifeos_token');
        const storedUser = localStorage.getItem('lifeos_user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (tokenValue, userData) => {
        setToken(tokenValue);
        setUser(userData);
        localStorage.setItem('lifeos_token', tokenValue);
        localStorage.setItem('lifeos_user', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('lifeos_token');
        localStorage.removeItem('lifeos_user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
