import { LandingTitle } from 'components/landing/first/LandingTitle'

const GuestLanding = () => (
  <div>
    <LandingTitle collapsed={false} />
    <div class="flex justify-center">
      <a
        href="/login"
        class="animate-fade bg-border px-4 py-3 bg-dark text-lg font-semibold border border-border-light rounded-xl hover:text-white transition-colors ease-linear"
      >
        Join the Universe
      </a>
    </div>
  </div>
)

export default GuestLanding
