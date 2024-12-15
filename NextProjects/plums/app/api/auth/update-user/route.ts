import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@auth0/nextjs-auth0';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req, NextResponse);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { user } = session;
    const { sub, name, email, picture } = user;

    await prisma.user.upsert({
      where: { email },
      update: {
        name,
        image: picture,
        emailVerified: new Date(),
      },
      create: {
        id: sub, // Store Auth0's user_id (sub) as the primary key
        name,
        email,
        image: picture,
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({ message: 'User profile updated' });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
