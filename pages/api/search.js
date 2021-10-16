import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = await client.db('sample_airbnb');
  const data = await db
    .collection('listingsAndReviews')
    .aggregate([
      {
        $search: {
          search: {
            query: req.query.term,
            path: ['name', 'summary', 'neighborhood'],
          },
        },
      },
      {
        $limit: 20,
      },
      {
        $project: {
          name: 1,
          summary: 1,
          neighborhood: 1,
        },
      },
    ])
    .toArray();

  res.json(data);
}
