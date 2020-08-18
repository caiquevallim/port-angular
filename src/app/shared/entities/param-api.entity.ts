export class ParamApiEntity {
  private name: string;
  private value: string;
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  public setName(value): void {
    this.name = value;
  }
  public getName(): string {
    return this.name;
  }
  public setValue(value): void {
    this.value = value;
  }
  public getValue(): string {
    return this.value;
  }
}
