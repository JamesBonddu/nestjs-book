import Joi from 'joi'

export const createCatSchema = Joi.object({
  name: Joi.string().required(),
  // username: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().min(1).max(120).required(),
  bread: Joi.string().required()
  // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  // repeat_password: Joi.ref('password')
  // access_token: [Joi.string(), Joi.number()],
  // email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}})
})
// .with('username', 'age')
// .xor('password', 'access_token')
// .with('password', 'repeat_password')
