/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
 
const prisma = new PrismaClient();
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
 
  const session = await getSession(req, res); // Await is required here
 
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
 
  const { user } = session;
  const { sub, name, email, picture } = user;
 
  try {
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
 
    return res.status(200).json({ message: 'User profile updated' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
 