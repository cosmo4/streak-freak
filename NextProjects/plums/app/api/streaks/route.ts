import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: NextRequest) {
    try {
      
      const { name, description, streakType, userEmail } = await req.json();
  
      if (!name || !streakType || !userEmail) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }

      const user = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
  
      const newStreak = await prisma.streak.create({
        data: {
          name,
          description,
          streakType,
          userId: user.id,
        },
      });
  
      return NextResponse.json(newStreak, { status: 201 });
    } catch (error) {
      console.error('Error creating streak:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const streaks = await prisma.streak.findMany({
      where: {
        user: {
          email,
        },
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(streaks);
  } catch (error) {
    console.error('Error fetching streaks:', error);
    return NextResponse.json({ message: 'Error fetching streaks' }, { status: 500 });
  }
}
