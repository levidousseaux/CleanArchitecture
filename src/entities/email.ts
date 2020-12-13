export class Email {
  static validate (email: string) {
    if (!email) {
      return false
    }

    const [local, domain] = email.split('@')

    if (email.length > 320) {
      return false
    }

    if (local.length > 64 || local.length === 0) {
      return false
    }

    if (domain.length > 255) {
      return false
    }
    return true
  }
}
