import { google } from '@ai-sdk/google'
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemMessages = messages.filter((m: { role: string }) => m.role === 'system')
  const nonSystemMessages = messages.filter((m: { role: string }) => m.role !== 'system')
  const instructions = systemMessages
    .map((m: { parts?: { text: string }[] }) => m.parts?.map((p: { text: string }) => p.text).join('') ?? '')
    .filter(Boolean)
    .join('\n')

  const result = streamText({
    model: google('gemini-3.1-flash-lite-preview'),
    messages: await convertToModelMessages(nonSystemMessages),
    ...(instructions ? { instructions } : {})
    // tools: {
    //   google_search: google.tools.googleSearch({})
    // }
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream })
  })
}
