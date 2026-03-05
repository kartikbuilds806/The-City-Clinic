import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// ── helpers ──────────────────────────────────────────────────────────────────
const LS_USERS = 'cdc_users'
const LS_CURRENT = 'cdc_current_user'
const LS_APPTS = 'cdc_appointments'

function loadUsers() {
    try { return JSON.parse(localStorage.getItem(LS_USERS)) || [] } catch { return [] }
}
function saveUsers(users) {
    localStorage.setItem(LS_USERS, JSON.stringify(users))
}
function loadCurrent() {
    try { return JSON.parse(localStorage.getItem(LS_CURRENT)) } catch { return null }
}
function saveCurrent(user) {
    localStorage.setItem(LS_CURRENT, JSON.stringify(user))
}
function loadAppointments() {
    try { return JSON.parse(localStorage.getItem(LS_APPTS)) || {} } catch { return {} }
}
function saveAppointments(appts) {
    localStorage.setItem(LS_APPTS, JSON.stringify(appts))
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(loadCurrent)
    const [appointments, setAppointments] = useState(loadAppointments)

    // Persist to localStorage whenever state changes
    useEffect(() => { saveCurrent(currentUser) }, [currentUser])
    useEffect(() => { saveAppointments(appointments) }, [appointments])

    // ── signup ──────────────────────────────────────────────────────────────
    const signup = ({ name, email, phone, password }) => {
        const users = loadUsers()
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, error: 'An account with this email already exists.' }
        }
        const newUser = {
            id: `u_${Date.now()}`,
            name,
            email,
            phone,
            password, // NOTE: plain-text — acceptable for a client-side demo
            createdAt: new Date().toISOString(),
            avatar: name.charAt(0).toUpperCase(),
        }
        saveUsers([...users, newUser])
        const safeUser = { ...newUser, password: undefined }
        setCurrentUser(safeUser)
        return { success: true, user: safeUser }
    }

    // ── login ───────────────────────────────────────────────────────────────
    const login = (email, password) => {
        const users = loadUsers()
        const found = users.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        )
        if (!found) return { success: false, error: 'Incorrect email or password.' }
        const safeUser = { ...found, password: undefined }
        setCurrentUser(safeUser)
        return { success: true, user: safeUser }
    }

    // ── logout ──────────────────────────────────────────────────────────────
    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem(LS_CURRENT)
    }

    // ── book appointment ────────────────────────────────────────────────────
    const bookAppointment = (apptData) => {
        if (!currentUser) return
        const appt = {
            id: `appt_${Date.now()}`,
            userId: currentUser.id,
            ...apptData,
            status: 'Pending',           // Pending | Confirmed | Cancelled
            bookedAt: new Date().toISOString(),
            cancelledAt: null,
            cancelReason: '',
        }
        setAppointments(prev => {
            const userAppts = prev[currentUser.id] || []
            return { ...prev, [currentUser.id]: [appt, ...userAppts] }
        })
        return appt
    }

    // ── cancel appointment ──────────────────────────────────────────────────
    const cancelAppointment = (apptId, reason = 'Cancelled by patient') => {
        if (!currentUser) return
        setAppointments(prev => {
            const userAppts = prev[currentUser.id] || []
            const updated = userAppts.map(a =>
                a.id === apptId
                    ? { ...a, status: 'Cancelled', cancelledAt: new Date().toISOString(), cancelReason: reason }
                    : a
            )
            return { ...prev, [currentUser.id]: updated }
        })
    }

    // ── getUserAppointments ─────────────────────────────────────────────────
    const getUserAppointments = () => {
        if (!currentUser) return []
        return appointments[currentUser.id] || []
    }

    return (
        <AuthContext.Provider value={{
            currentUser,
            signup,
            login,
            logout,
            bookAppointment,
            cancelAppointment,
            getUserAppointments,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
