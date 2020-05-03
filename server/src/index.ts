import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from "@prisma/client";

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

server.start(() => console.log('The server is now running at localhost:4000'))
