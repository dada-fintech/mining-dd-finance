import React from 'react'
import './style.scss'

const content = `
The Aon mine is in partnership with a large central enterprise, the group has the second largest installed power generation capacity in the world and the first in Asia. And we cooperate with the power plant installed 350,000 kwh (kilowatt hours), power supply to our exclusive mines, dry water 10,000 kwh, rich water / flat water 25,000 kwh (April-November). All year round 10,000kwh built into the Ethernet graphics card slot, machine room with thickened steel, single row design, a complete solution to the problem of mining machine cooling. By the end of October this year, this site is a rare high-quality resources in Sichuan, nearly half of the load is stable throughout the year, close to Chengdu, the road is in very good condition, the site area is large (6,000 square meters), we built two single-row Ethernet graphics card machine room, two bitcoin chip machine room, built absolutely high, with high-end customers to visit the quality of the site, will be engaged in the mining industry is a business card, you deserve to have! A mine owner identity.<br/><br/><img src="/img/mining.png"/> 
`

export default function Detail() {

    return (<div className="detail-module">
        <div className="article" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>)
}
