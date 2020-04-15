import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        okrs: async (parent: any, args: any, context: any) => {
            const okrs = await prisma.okr.findMany()
            return okrs
        }
    },
    Mutation: {
        createOkr: (parent: any, args: any, context: any) => {
            // TODO: Get userId from context instead
            const userId = 1
            return context.prisma.okr.create({
                data: { objective: args.objective }
            })
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
