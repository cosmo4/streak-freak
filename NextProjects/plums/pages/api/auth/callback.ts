/* eslint-disable @typescript-eslint/no-explicit-any */

import { handleCallback } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma'; // Adjust the path to your Prisma client

export default handleCallback({
  async afterCallback(session: any) {
    try {
      // Check if the user exists in the database
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      // If the user doesn't exist, create them
      if (!user) {
        await prisma.user.create({
          data: {
            email: session.user.email,
            name: session.user.name,
            image: session.user.picture,
          },
        });
      }

      // Return the updated session
      return session;
    } catch (error) {
      console.error('Error during afterCallback:', error);
      throw new Error('Failed to process user login');
    }
  },
});
