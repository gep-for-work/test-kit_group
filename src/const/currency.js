import randomInt from '../utils/randomInt'

const reserveMin = 1_0000
const reserveMax = 10_0000

export default {
  USD: {
    name: 'United States dollar',
    reserve: randomInt(reserveMin, reserveMax)
  },
  UAH: {
    name: 'Ukrainian hryvnia',
    reserve: randomInt(reserveMin, reserveMax)
  },
  EUR: {
    name: 'Euro',
    reserve: randomInt(reserveMin, reserveMax)
  },
  PLN: {
    name: 'Polish złoty',
    reserve: randomInt(reserveMin, reserveMax)
  },
  CZK: {
    name: 'Czech koruna',
    reserve: randomInt(reserveMin, reserveMax)
  }
}
