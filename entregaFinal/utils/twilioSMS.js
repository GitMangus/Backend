const twilio = require('twilio')

const dotenv = require('dotenv')
dotenv.config()

const accountSid = 'AC3ea9961d8a1dda88009f5e64942dcc05' 
const authToken = 'b26ea369b7ec94e5441a11e7daa06343' 

const client = twilio(accountSid, authToken)

const sendSMS = async (body, from, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: from,
            to: to
        })
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendSMS