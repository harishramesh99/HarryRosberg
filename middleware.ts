import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const isProduction = process.env.NODE_ENV === 'production'

  // Extract subdomain
  const currentHost = isProduction
    ? hostname.replace(`.harryrosberg.ca`, '')
    : hostname.replace(`.127.0.0.1.nip.io:3001`, '')

  // Skip conditions
  const skipPaths = [
    '/_next',
    '/api',
    '/fonts',
    '/examples',
    '/studio',
    '/new'
  ]
  if (
    skipPaths.some(path => request.nextUrl.pathname.startsWith(path)) ||
    hostname === 'localhost:3001' ||
    hostname === 'bytesma.com' ||
    !currentHost ||
    currentHost === 'www'
  ) {
    return NextResponse.next()
  }

  try {
    console.log(`[Middleware] Fetching instance for subdomain: ${currentHost}`)

    const lookupResponse = await fetch(
      `${process.env.PORTAL_API_URL}/api/instances/lookup/${currentHost}`,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    if (!lookupResponse.ok) {
      console.error(
        `[Middleware] Failed to fetch instance: ${lookupResponse.status} ${lookupResponse.statusText}`
      )
      return NextResponse.next()
    }

    const instanceData = await lookupResponse.json()
    const requestHeaders = new Headers(request.headers)

    // Inject projectId and sanity token into headers
    requestHeaders.set('x-project-id', instanceData.projectId)
    requestHeaders.set('x-sanity-token', instanceData.token)
    requestHeaders.set('x-subdomain', currentHost)


    console.log(
      `[Middleware] Injected projectId: ${instanceData.projectId} for subdomain: ${currentHost}`
    )

    return NextResponse.next({
      request: { headers: requestHeaders }
    })
  } catch (error: any) {
    console.error(`[Middleware] Unexpected error: ${error.message}`)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)'
  ]
}
