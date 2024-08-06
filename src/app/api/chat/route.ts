import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { unstable_noStore as noStore } from 'next/cache'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  noStore()
  const { messages } = await req.json()

  const result = await streamText({
    model: google('models/gemini-1.5-flash-latest'),
    messages
  })

  return result.toDataStreamResponse()
}
