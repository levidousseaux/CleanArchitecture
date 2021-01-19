import { User } from '../../entities/user'
import { UserData } from '../../entities/user-data'
import { InvalidEmailError } from '../../errors/invalid-email-error'
import { InvalidNameError } from '../../errors/invalid-name-error'
import { Either, left, right } from '../../shared/either'
import { UserRepository } from './ports/user-repository'

export class RegisterUserOnMailingList {
    private readonly userRepo: UserRepository

    constructor (userRepo: UserRepository) {
      this.userRepo = userRepo
    }

    public async registerUserOnMailingList (request: UserData): Promise<Either<InvalidEmailError | InvalidNameError, UserData>> {
      const userOrError: Either<InvalidEmailError | InvalidNameError, User> = User.create(request)
      if (userOrError.isLeft()) {
        return left(userOrError.value)
      }

      if (!(await this.userRepo.exists(request))) {
        await this.userRepo.add(request)
      }
      return right(request)
    }
}