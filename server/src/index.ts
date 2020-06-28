import { ApolloServer, gql } from 'apollo-server-express'
import express from "express"
import path, { join } from 'path'
import connectToMongoDb from '../database/databaseSetup'
import { Collection, ObjectID, ObjectId } from 'mongodb'
import { readFileSync } from 'fs'
import dotenv from "dotenv"

import isTokenValid from "./validate"

dotenv.config()

const typeDefs = readFileSync(join(__dirname, "./schema.graphql"), "utf8");

const app = express()

app.use(express.static(path.join(__dirname, '../../client/build')))

const getCompany = (context: any) => {
    /* If user is not associated with a company, use the user_id/sub instead */
    if (!context?.user) return
    return context.user.company ? context.user.company : context.user.sub
}

const resolvers = {
    Query: {
        okrs: async (parent: any, args: any, context: any) => {
            const company = getCompany(context)
            if (!company) return;
            const okrs = await okrCollection.find({ company: company }).toArray()
            return okrs
        },
        okrCount: async () => {
            const count = await okrCollection.countDocuments()
            return count
        },
        keyResults: async (parent: any, args: any, context: any) => {
            const company = getCompany(context)
            if (!company) return [];
            const keyResults = await keyResultCollection.find({ company: company }).toArray()
            return keyResults ? keyResults : []
        },
        keyResultsCount: async () => {
            const count = await keyResultCollection.countDocuments()
            return count
        },
        companies: async () => {
            const companies = await userCollection.distinct('company')
            return companies
        },
        companyCount: async () => {
            const companies = await userCollection.distinct('company')
            return companies.length
        }
    },
    Mutation: {
        createOkr: async (parent: any, args: any, context: any) => {
            const company = getCompany(context)
            if (!company) return
            const okr = args
            okr.company = company
            const now = Date.now()
            okr.createdAt = now
            okr.updatedAt = now
            const res = await okrCollection.insertOne(okr)
            return res.ops[0]
        },
        updateOkr: async (parent: any, args: any, context: any) => {
            const company = getCompany(context)
            if (!company) return
            const okr = args;
            okr.updatedAt = Date.now()
            const { _id, ...rest } = okr
            const prevRes = await okrCollection.findOne({ _id: new ObjectID(_id) })
            if (prevRes.company !== company) return
            const res = await okrCollection.findOneAndUpdate({ _id: new ObjectID(_id) }, { $set: rest }, { returnOriginal: false })
            return res.value ? res.value : null;
        },
        deleteOkrs: async (parent: any, args: any, context: any) => {
            const company = getCompany(context)
            if (!company) return 0
            const deleted = await okrCollection.deleteMany({ company: company })
            return deleted.deletedCount
        },
        deleteOkr: async (parent: any, args: any, context: any) => {
            const company = getCompany(context)
            if (!company) return
            const prevRes = await okrCollection.findOne({ _id: new ObjectID(args._id) })
            if (prevRes.company !== company) return
            const deleted = await okrCollection.deleteOne({ _id: new ObjectID(args._id) })
            return deleted.deletedCount ? args._id : null
        },
        createKeyResult: async (parent: any, args: any, context: any) => {
            const company = getCompany(context)
            if (!company) return
            const kr = args
            kr.company = company
            kr.okrId = new ObjectID(kr.okrId)
            const now = Date.now()
            kr.createdAt = now
            kr.updatedAt = now
            const res = await keyResultCollection.insertOne(kr)
            return res.ops[0]
        },
        deleteKeyResults: async (parent: any, args: any, context: any) => {
            const company = getCompany(context)
            if (!company) return 0
            const deleted = await keyResultCollection.deleteMany({ company: company })
            return deleted.deletedCount
        }
    },
    Okr: {
        keyResults: async (parent: any) => {
            const keyResults = await keyResultCollection.find({ okrId: new ObjectId(parent._id) }).toArray()
            return keyResults
        }
    }
};

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user = await isTokenValid(token)
        return { user }
    }
})

server.applyMiddleware({ app })

//Establishing database connection
let okrCollection: Collection, keyResultCollection: Collection, userCollection: Collection
connectToMongoDb().then(res => {
    [okrCollection, keyResultCollection, userCollection] = res
})

app.listen({ port: process.env.PORT || 4000 }, () => console.log(`The server is now running on port ${process.env.PORT || 4000}`))

// server.express.use('/*', express.static(path.join(__dirname, '../../client/build', 'index.html')))