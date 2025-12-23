import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api-project-gules.vercel.app/api/health", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch health status"
      },
      { status: 500 }
    )
  }
}
