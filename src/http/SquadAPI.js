import { $host } from "./index";

export const getSquadLiders = async () => {
    const data = await $host.get('api/clans/top')
    return data
}

export const getSquadInfo = async (clanId) => {
    const data = await $host.get(`api/clans/info/${clanId}`)
    return data
}