/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    user: {
      id: number
      profileUrl: string
      username: string
      guest?: true
    }
  }
}
