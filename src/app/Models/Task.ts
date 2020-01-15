export class Task {
  constructor(
    public id = 0,
    public text = '',
    public date = new Date(),
    public users: string[] = []
  ) {}
}
