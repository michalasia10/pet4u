export interface IAuthCredentialsProps {
  email: string;
  pass: string;
}

export class AuthCredentials {
  private readonly email: string;
  private readonly pass: string;

  private constructor(props: IAuthCredentialsProps) {
    if (!props.email || !props.pass) {
      throw new Error("Email and password are required");
    }
    this.email = props.email;
    this.pass = props.pass;
  }

  public static create(props: IAuthCredentialsProps): AuthCredentials {
    return new AuthCredentials(props);
  }

  public toJSON(): IAuthCredentialsProps {
    return {
      email: this.email,
      pass: this.pass,
    };
  }
} 