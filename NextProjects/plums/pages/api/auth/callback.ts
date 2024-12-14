/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { handleCallback } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma'; // Adjust the path to your Prisma client

export default handleCallback({
  async afterCallback(req, res, session, state) {
    try {
      // Ensure session exists
      if (!session || !session.user) {
        throw new Error('Session or user data is missing.');
      }

      const { email, name, picture: image } = session.user;

      // Validate email existence
      if (!email) {
        throw new Error('User email is required but missing in session.');
      }

      // Check if the user exists in the database
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // If the user doesn't exist, create them
      if (!user) {
        await prisma.user.create({
          data: {
            email,
            name: name || null,
            image: image || null,
            emailVerified: session.user.email_verified
              ? new Date() // Mark email as verified if provided
              : null,
          },
        });
      }

      // Return the updated session
      return session;
    } catch (error: any) {
      console.error('Error during afterCallback:', error.message);
      throw new Error('Failed to process user login');
    }
  },
});
