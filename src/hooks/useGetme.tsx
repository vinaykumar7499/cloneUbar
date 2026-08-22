'use client'
import { useEffect } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { setUserData } from "@/redux/userSlice"

function useGetMe() {
    const { data: session, status } = useSession()
    const dispatch = useDispatch()

    useEffect(() => {
        const getMe = async () => {
            try {
                const { data } = await axios.get("/api/user/me")
                console.log("Logged In User Data (from /api/user/me):", data)
                if (data?.user) {
                    dispatch(setUserData(data.user))
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error)
            }
        }

        // Jab user authenticated ho tabhi backend se data mangwayenge
        if (status === "authenticated") {
            getMe()
        } else if (status === "unauthenticated") {
            dispatch(setUserData(null))
        }
    }, [status, dispatch])
}
export default useGetMe

