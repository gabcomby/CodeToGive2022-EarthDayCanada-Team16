import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("farmers").insertOne(bodyObject);
      break;
    case "GET":
      const allPosts = await db.collection("farmers").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}