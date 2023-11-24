/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    user: {
      id: number
      profileUrl: string
      username: string
    }
  }
}
