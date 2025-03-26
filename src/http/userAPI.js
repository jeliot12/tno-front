import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (telegramId, username, referralCode) => {
    const {data} = await $host.post('api/auth/register ', {telegramId, username, referralCode})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (telegramId) => {
    const {data} = await $host.post('api/auth/login', {telegramId})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
    // return data
}

export const getBalanceUser = async (telegramId) => {
    const {data} = await $host.post('api/user/balance', {telegramId})
    localStorage.setItem('balance', data.user.balance)
    return data.user.balance
}

export const saveBalance = async (telegramId, balance) => {
    const {data} = await $host.post('api/user/balancesave', {telegramId, balance})
    return data
}

export const getUserLeaders = async () => {
    const data = await $host.get('api/stats/top')
    return data
}

export const getRefLinkUser = async (telegramId) => {
    const {data} = await $host.post('api/auth/reflink', {telegramId})
    localStorage.setItem('referralLink', data.user.referralLink)
    return data.user.referralLink
}