
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { entryValue, streakType } = await req.json();

  try {
    const newEntry = await prisma.entry.create({
      data: {
        streakId: id,
        count: streakType === 'COUNT' ? entryValue : undefined,
        duration: streakType === 'DURATION' ? entryValue : undefined,
        quantity: streakType === 'QUANTITY' ? entryValue : undefined,
        click: streakType === 'CLICK' ? entryValue : undefined,
      },
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error('Error creating entry:', error);
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
  }
}
