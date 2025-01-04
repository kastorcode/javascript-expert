import NinjaFactory from './factory/ninjaFactory.js'
import SamuraiFactory from './factory/samuraiFactory.js'
import VikingFactory from './factory/vikingFactory.js'

const ninjaFactory = NinjaFactory.getInstance()
const samuraiFactory = SamuraiFactory.getInstance()
const vikingFactory = VikingFactory.getInstance()

console.log(ninjaFactory)
console.log(samuraiFactory)
console.log(vikingFactory)