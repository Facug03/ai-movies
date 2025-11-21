import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: google('models/gemini-2.5-flash'),
    messages
  })

  console.log({ result })

  return result.toDataStreamResponse()
}
