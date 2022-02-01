import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      gray: string;
      white: string;
      black: string;
    };
    size: {
      mobile: string;
    };
  }
}
