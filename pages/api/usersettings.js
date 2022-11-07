import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("users");
    switch (req.method) {
      case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("user_settings").insertOne(bodyObject);
        res.json(myPost.ops[0]);
        break;
      case "GET":
        const allPosts = await db.collection("user_settings").find({}).toArray();
        res.json({ status: 200, data: allPosts });
        break;
    }
  }