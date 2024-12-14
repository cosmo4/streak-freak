/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function me(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Retrieve the user session
    const session = await getSession(req, res);

    if (!session || !session.user) {
      return res.status(401).json({ error: 'User is not authenticated' });
    }

    // Return the user information
    res.status(200).json({
      user: session.user,
    });
  } catch (error: any) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch user session' });
  }
});
