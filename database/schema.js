import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    name: String,
    vegetable: String,
    vegetableEmoji: String,
    capacity_min: Number,
    capacity_max: Number,
    address: String,
    distance: Number,
    distanceUnit: String,
    date_min: Date,
    date_max: Date,
    description: String,
})
let eventtt
try {
    eventtt = mongoose.model("Eventtt")
} catch(e) {console.log(1)}
try {
    eventtt = mongoose.model("Eventtt", eventSchema)
} catch(e) {console.log(2)}

export default eventtt