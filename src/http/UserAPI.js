import { $host } from "./index";
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

export const checkSubscribe = async (userId, username) => {
    // const balance = 3000;
    const {data} = await $host.post('api/check-subscription', {userId, username});
    return data
}

export const checkTasks = async (telegramId) => {
    const {data} = await $host.get(`api/check/tasks/${telegramId}`)
    return data
}

export const checkUserOnDB = async (telegramId,username) => {
    const {data} = await $host.post('api/user/check-user', {telegramId, username})
    return data.exists
}

export const getUsersReferral = async (telegramId) => {
    const {data} = await $host.post('api/stats/listReferrer', {telegramId});
    return data
}

export const checkInvite = async (telegramId, username) => {
    const {data} = await $host.get('api/check/invite', {telegramId, username})
    return data
}

export const getIdentification = async (username) => {
    const {data} = await $host.get(`api/identification/${username}/id`);
    return data
}

export const getUsersInfo = async (username) => {
    const {data} = await $host.get(`api/identification/getinfo${username}`);
    return data
}

export const leaveSquad = async (telegramId) => {
    const {data} = await $host.post('api/clans/leave', {telegramId});
    return data
}