import { Standing } from "server/db/entity"

export const STANDINGS: Standing[] = [
	"Ida Jacobs",
	"Tomasz Brady",
	"Adele Walsh",
	"Athena Barton",
	"Muhammed Cooper",
	"Adnan Vargas",
	"Rebekah Garner",
	"Wilma England",
	"Julius Bartlett",
	"Aleena Dean",
].map((name) => ({
	id: Math.floor(Math.random() * 100000),
	rank: 1,
	name,
	points: Math.floor(Math.random() * 100),
	omw: Math.random(),
	gw: Math.random(),
	ogw: Math.random(),
}))
