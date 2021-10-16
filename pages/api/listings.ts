import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = await client.db('sample_airbnb');
  const listings = await db.collection('listingsAndReviews').find().limit(12).toArray();
  res.json(listings);
}
