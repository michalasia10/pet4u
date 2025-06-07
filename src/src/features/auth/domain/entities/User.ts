export interface IUserProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class User {
  private readonly id: string;
  private readonly email: string;
  private readonly firstName: string;
  private readonly lastName:string;

  private constructor(props: IUserProps) {
    // Prosta walidacja jako przykład
    if (!props.id) throw new Error("User ID is required");
    if (!props.email.includes('@')) throw new Error("Invalid email format for User");
    if (!props.firstName || !props.lastName) throw new Error("First and last name are required for User");
    
    this.id = props.id;
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
  }

  public static create(props: IUserProps): User {
    return new User(props);
  }
  
  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getFirstName(): string {
    return this.firstName;
  }
  
  public getLastName(): string {
    return this.lastName;
  }

  public toJSON(): IUserProps {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    };
  }
} 