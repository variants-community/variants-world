/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: {
      id: number
      profileUrl: string
      username: string
    } & ({ guest: true; role?: undefined } | { guest?: undefined; role: 'MEMBER' | 'TESTER' | 'LOCKED' })
  }
}

interface Window {
  from: string
}
