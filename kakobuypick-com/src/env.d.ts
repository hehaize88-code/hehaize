declare namespace App {
  interface Locals {
    assets?: {fetch(request:Request):Promise<Response>};
  }
}
