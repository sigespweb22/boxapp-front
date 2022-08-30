// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    debugger;
    
    const response = NextResponse.next()
    response.cookies.set('vercel', 'fast')
    response.cookies.set('vercel', 'fast', { path: '/test' })
}