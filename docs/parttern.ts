const getBonus = function (level: 'S' | 'A' | 'B' | 'C', salary: number) {
  if (level === 'S') {
    return salary * 4
  }
  if (level === 'A') {
    return salary * 3
  }
  if (level === 'B') {
    return salary * 2
  }
  if (level === 'C') {
    return salary
  }
  return salary
}
getBonus('A', 10000)

const getSBonus = function (salary) {
  return salary * 4
}
const getABonus = function (salary) {
  return salary * 3
}
const getBBonus = function (salary) {
  return salary * 2
}
const getCBonus = function (salary) {
  return salary * 1
}
const getBonus2 = function (level: 'S' | 'A' | 'B' | 'C', salary: number) {
  if (level === 'S') {
    return getSBonus(salary)
  }
  if (level === 'A') {
    return getABonus(salary)
  }
  if (level === 'B') {
    return getBBonus(salary)
  }
  if (level === 'C') {
    return getCBonus(salary)
  }
  return salary
}
getBonus2('A', 10000)

const getSBonus3 = function () {}
getSBonus3.prototype.calculate = function (salary) {
  return salary * 4
}
const getABonus3 = function () {}
getSBonus3.prototype.calculate = function (salary) {
  return salary * 3
}
const getBBonus3 = function () {}
getSBonus3.prototype.calculate = function (salary) {
  return salary * 2
}
const getCBonus3 = function () {}
getSBonus3.prototype.calculate = function (salary) {
  return salary
}
const Bonus = function () {
  this.salary = null
  this.strategy = null
}
Bonus.prototype.setSalary = function (salary: number) {
  this.salary = salary
}
Bonus.prototype.setStrategy = function (strategy: string) {
  this.strategy = strategy
}
Bonus.prototype.getBonus = function () {
  return this.strategy.calculate(this.salary)
}
