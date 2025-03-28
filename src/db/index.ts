'use server'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function getUsers(search = '') {
    return await prisma.user.findMany({ where: { nickname: { contains: search, mode: 'insensitive' } } });
}

export async function getUserByNickname(nickname: string) {
    return await prisma.user.findFirst({ where: { nickname } })
}

export async function addUser(nickname: string, description: string) {
    return await prisma.user.create({ data: { nickname, description } })
}

export async function deleteUser(nickname: string) {
    return await prisma.user.delete({ where: { nickname } })
}