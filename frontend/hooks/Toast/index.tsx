import React from 'react'
import ErrorToast from '@/hooks/Toast/ErrorToast'
import SuccessToast from "@/hooks/Toast/SuccessToast";


const ToastMessage = () => {
    return (
        <>
            <ErrorToast />
            <SuccessToast/>
        </>
    )
}

export default ToastMessage
