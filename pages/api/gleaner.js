import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("gleaners").insertOne(bodyObject);
      break;
    case "GET":
      const allPosts = await db.collection("gleaners").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}