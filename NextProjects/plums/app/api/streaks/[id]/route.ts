import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const streak = await prisma.streak.findUnique({
      where: { id },
    });

    if (!streak) {
      return NextResponse.json({ error: 'Streak not found' }, { status: 404 });
    }

    return NextResponse.json(streak);
  } catch (error) {
    console.error('Error fetching streak:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedStreak = await prisma.streak.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedStreak);
  } catch (error) {
    console.error('Error updating streak:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.streak.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Streak deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting streak:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
