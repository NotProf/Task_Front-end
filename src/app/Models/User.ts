export class User {
  constructor(
    public id = 0,
    public username = '',
    public password = '',
    public email = '',
    public tasks: number[] = []
  ) {}
}
