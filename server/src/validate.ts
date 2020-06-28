import config from '../../auth_config.json'
import jwksClient from 'jwks-rsa'
import jwt, { Algorithm } from 'jsonwebtoken'

// Using REACT_APP prefix to make it work with react (can possibly be removed)
const domain = process.env.REACT_APP_AUTH0_DOMAIN || config.domain
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || config.clientId
const audience = process.env.REACT_APP_AUTH0_AUDIENCE || config.audience

const client = jwksClient({
    jwksUri: `https://${domain}/.well-known/jwks.json`
});

const getKey = (header: any, cb: any) => {
    client.getSigningKey(header.kid, (err, key: jwksClient.SigningKey) => {
        const signingKey = (key as jwksClient.CertSigningKey).publicKey || (key as jwksClient.RsaSigningKey).rsaPublicKey;
        cb(null, signingKey);
    });
}

const isTokenValid = async (token: string) => {
    if (token) {
        const bearerToken = token.split(" ")

        const result = new Promise((resolve, reject) => {
            jwt.verify(
                bearerToken[1],
                getKey,
                {
                    issuer: `https://${domain}/`,
                    algorithms: ["RS256"]
                },
                (error, decoded) => {
                    if (error) {
                        resolve({ error })
                    }
                    if (decoded) {
                        resolve(decoded)
                    }
                }
            )
        })

        return result
    }

    return { error: 'No Token provided' }
}

export default isTokenValid