import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: google('models/gemini-1.5-flash-latest'),
    messages
  })

  return result.toDataStreamResponse()
}
