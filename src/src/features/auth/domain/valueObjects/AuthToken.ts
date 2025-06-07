export interface IAuthTokenProps {
  accessToken: string;
  refreshToken: string;
}

export class AuthToken {
  private readonly accessToken: string;
  private readonly refreshToken: string;

  private constructor(props: IAuthTokenProps) {
    if (!props.accessToken || !props.refreshToken) {
      throw new Error("Access and refresh tokens are required");
    }
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }

  public static create(props: IAuthTokenProps): AuthToken {
    return new AuthToken(props);
  }

  public getAccessToken(): string {
    return this.accessToken;
  }
  
  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public toJSON(): IAuthTokenProps {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }
} 