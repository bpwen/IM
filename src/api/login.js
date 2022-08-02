import { post } from '@/utils/request'

export const loginByUsername = params => {
    return post('/auth/login', params);
}

export const logout = () => {
    return post('/auth/logout');
}