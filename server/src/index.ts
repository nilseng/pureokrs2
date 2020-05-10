import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from "@prisma/client";
import express from "express";
import path from 'path';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        companies: async (parent: any, args: any, context: any) => {
            const companies = await context.prisma.company.findMany()
            return companies
        },
        okrs: async (parent: any, args: any, context: any) => {
            const okrs = await context.prisma.okr.findMany()
            return okrs
        }
    },
    Mutation: {
        createCompany: (parent: any, args: any, context: any) => {
            return context.prisma.company.create({
                data: { name: args.name }
            })
        },
        createOkr: (parent: any, args: any, context: any) => {
            return context.prisma.okr.create({
                data: {
                    objective: args.objective,
                    Company: {
                        connect: { id: args.companyId }
                    }
                }
            })
        },
        deleteOkrs: async (parent: any, args: any, context: any) => {
            const deleted = await context.prisma.okr.deleteMany({ where: { id: { gte: 0 } } })
            return deleted?.count
        }
    },
    Okr: {
        company: async (parent: any) => {
            const company = await prisma.company.findOne({
                where: {
                    id: parent.companyId
                }
            })
            return company
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    }
})

prisma.raw`SELECT * FROM "Okr"`.then(res => console.log(res))

server.express.use(express.static(path.join(__dirname, '../../client/build')))

server.start(({ port: process.env.PORT || 4000, playground: '/playground', endpoint: '/graphql' }), ({ port }) => console.log(`The server is now running on port ${port}`));

server.express.use('/*', express.static(path.join(__dirname, '../../client/build', 'index.html')));