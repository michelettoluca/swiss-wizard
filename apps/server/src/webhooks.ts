import { UserWebhookEvent, WebhookEvent } from "@clerk/clerk-sdk-node"
import { Request, Response } from "express"
import { Webhook } from "svix"
import { prisma } from "./prisma"

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env")
}

export const handleClerkWebhooks = async (req: Request, res: Response) => {
    const { headers, body } = req

    const svix_id = headers["svix-id"] as string
    const svix_timestamp = headers["svix-timestamp"] as string
    const svix_signature = headers["svix-signature"] as string

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400
        })
    }

    const webhook = new Webhook(WEBHOOK_SECRET)

    let webhookEvent: WebhookEvent

    try {
        webhookEvent = webhook.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent
    } catch (err: any) {
        console.log("Webhook failed to verify. Error:", err.message)

        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

    await handleClerkEvent(webhookEvent)

    return res.status(200).json({
        success: true,
        message: "Webhook received"
    })
}

async function handleClerkEvent(event: WebhookEvent) {
    switch (event.type) {
        case "user.created":
            return await handleUserCreate(event)

        case "user.deleted":
            return await handleUserDelete(event)

        case "user.updated":
            return await handleUserUpdate(event)

        default:
            console.log(`Clerk event type ${event.type} not supported.`)
    }
}

async function handleUserCreate(event: UserWebhookEvent) {
    console.log(">>> handleUserCreate")

    await prisma.user.create({
        data: {
            accountId: event.data.id!
        }
    })
}

async function handleUserUpdate(event: UserWebhookEvent) {
    console.log("handleUserUpdate")
}

async function handleUserDelete(event: UserWebhookEvent) {
    const accountId = event.data.id

    const user = await prisma.user.findUnique({
        where: {
            accountId
        }
    })

    if (!user) {
        return false
    }

    await prisma.user.delete({
        where: {
            accountId
        }
    })

    return true
}
