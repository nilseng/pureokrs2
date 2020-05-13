import { GraphQLServer } from 'graphql-yoga'
import express from "express"
import path from 'path'
import connectToMongoDb from '../database/databaseSetup'
import { Collection, ObjectID, ObjectId } from 'mongodb'

const resolvers = {
    Query: {
        okrs: async () => {
            const okrs = await okrCollection.find({}).toArray()
            console.log(okrs)
            return okrs
        },
        okrCount: async () => {
            const count = await okrCollection.countDocuments()
            return count
        },
        keyResults: async () => {
            const keyResults = await keyResultCollection.find({}).toArray()
            return keyResults
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
        createOkr: async (parent: any, args: any) => {
            const res = await okrCollection.insertOne(args)
            return res.ops[0]
        },
        deleteOkrs: async () => {
            const deleted = await okrCollection.deleteMany({})
            return deleted.deletedCount
        },
        deleteOkr: async (parent: any, args: any) => {
            const deleted = await okrCollection.deleteOne({ _id: new ObjectID(args._id) })
            return deleted.deletedCount ? args._id : null
        },
        createKeyResult: async (parent: any, args: any) => {
            const kr = args
            kr.okrId = new ObjectID(kr.okrId)
            const now = Date.now()
            kr.createdAt = now
            kr.updatedAt = now
            const res = await keyResultCollection.insertOne(kr)
            return res.ops[0]
        },
        deleteKeyResults: async () => {
            const deleted = await keyResultCollection.deleteMany({})
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

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.express.use(express.static(path.join(__dirname, '../../client/build')))

//Establishing database connection
let okrCollection: Collection, keyResultCollection: Collection, userCollection: Collection
connectToMongoDb().then(res => {
    [okrCollection, keyResultCollection, userCollection] = res
})

const options = {
    port: process.env.PORT || 4000, playground: '/playground', endpoint: '/graphql'
}

server.start(options, ({ port }) => console.log(`The server is now running on port ${port}`))

// server.express.use('/*', express.static(path.join(__dirname, '../../client/build', 'index.html')))