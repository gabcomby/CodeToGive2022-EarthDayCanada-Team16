import main from "../../database/connection"
import eventtt from "../../database/schema"

export default function testEvent(req, res) {
    main().catch(error => console.log(error))

    const create = new eventtt({
        name: 'Bear Creek Ranch',
        vegetable: 'Tomato',
        vegetableEmoji: "🍅",
        capacity_min: 7, 
        capacity_max: 12,
        address: "2907 Township Rd, Bonnyville, T9N2J6, Alberta, Canada",
        distance: 5,
        distanceUnit: "km",
        date_min: new Date(2022, 11, 1),
        date_max: new Date(2022, 11, 5),
        description: 'Looking for a group of cool people willing to give their day away to gather some tomatoes for the greater cause!.'
    })
    create.save()


}