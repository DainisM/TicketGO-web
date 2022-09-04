import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET);

app.use(cors({ origin: true }));
app.use(express.json());

const url = process.env.ATLAS_URI;
const client = new MongoClient(url);
const dbName = "TicketGO";

// Method to find item price in DB by section ID
const findInDB = async (sectionID) => {
	try {
		//Connect to Mongo
		await client.connect();
		console.log("Connected successfully to server");

		//Connect to DB and wanted collection
		const db = client.db(dbName);
		const collection = db.collection("Sections");

		//Find section by ID
		const findSection = await collection.findOne({
			_id: new ObjectId(sectionID),
		});

		//Return section price
		return findSection.price;
	} catch (error) {
		throw error;
	}
};

app.post("/payments/create", async (req, res) => {
	// Initial total amount
	let total = 0;

	//Get items from request body
	const { items } = req.body;

	//Loop thought every item and for each item in array do something
	await items.forEach(async (item) => {
		//Call findInDB method to find item price
		const itemPrice = await findInDB(item.section);

		//Add price * item quantity to total price
		total = total + itemPrice * item.quantity;
	});

	//After a 0.5 sek timeout create stripe payment intet with necessary data
	setTimeout(async () => {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total * 100,
			currency: "dkk",
			automatic_payment_methods: {
				enabled: true,
			},
		});

		//Send response back
		res.status(200).send({
			clientSecret: paymentIntent.client_secret,
			amount: total,
		});
	}, 500);
});

app.get("*", (req, res) => {
	res.status(404).send("404 Not Found");
});

app.listen(4000, () => {
	console.log("Sever is listening on port 4000");
});
