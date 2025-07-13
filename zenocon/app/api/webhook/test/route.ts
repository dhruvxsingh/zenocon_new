import { NextRequest, NextResponse } from 'next/server';

// Simple test endpoint to verify your webhook URL is accessible
export async function GET(request: NextRequest) {
  const timestamp = new Date().toISOString();
  
  return NextResponse.json({
    status: 'ok',
    message: 'Webhook endpoint is accessible',
    timestamp,
    url: request.url,
    method: 'GET'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const timestamp = new Date().toISOString();
    
    console.log('Test webhook received:', body);
    
    return NextResponse.json({
      status: 'received',
      message: 'Test webhook processed successfully',
      timestamp,
      receivedData: body,
      headers: Object.fromEntries(request.headers.entries())
    });
  } catch (error) {
    console.error('Test webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process test webhook' },
      { status: 500 }
    );
  }
}