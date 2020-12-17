import { InvalidEmailError } from '../errors/invalid-email-error'
import { left } from '../shared/either'
import { User } from './user'

describe('User domain class', () => {
  test('should not create user with invalid e-mail addres', () => {
    const invalidEmail = 'invalid_email'
    const erro = User.create({ name: 'any_name', email: invalidEmail })
    expect(erro).toEqual(left(new InvalidEmailError()))
  })
})
