'use server'

interface User {
    nickname: string,
    description: string,
    faceitId?: string
}
type ResponseError = { error: string }

const url = process.env.API_URL;

export async function getUsers(search = '') {
    const res = await fetch(url + '/users?search=' + search);
    return await res.json() as User[]
}

export async function getUserByNickname(nickname: string) {
    const res = await fetch(url + '/user/' + nickname);
    const data = await res.json();
    if (Object.hasOwn(data, 'error')) {
        return data as ResponseError
    }
    return data as User
}

export async function addUser(nickname: string, description: string) {
    const res = await fetch(url + '/user', {
        method: 'POST',
        body: JSON.stringify({
            nickname,
            description
        })
    });
    const data = await res.json();
    if (res.status === 200) {
        return data as User;
    }
    return data as ResponseError
}

export async function deleteUser(nickname: string) {
    const res = await fetch(url + '/user/' + nickname, { method: 'DELETE' });
    const data = await res.json();
    if (res.status === 200) {
        return data as User;
    }
    return data as ResponseError;
}