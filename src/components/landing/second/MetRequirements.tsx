import CheckMarkIcon from 'components/icons/CheckMarkIcon'

// TODO: replace by actual values and map over Record<Requirement, string>
export const MetRequirements = () => (
  <div>
    <h3 class="text-center pb-2 font-semibold text-xl mr-4">All requirements are met</h3>
    <div class="grid grid-cols-[repeat(2,auto)] gap-x-10 gap-y-1 justify-start">
      <div class="flex gap-x-3 items-center">
        <CheckMarkIcon class="fill-green w-3.5" /> 12 days time span
      </div>
      <div class="flex gap-x-3 items-center">
        <CheckMarkIcon class="fill-green w-3.5" /> 5 final versions
      </div>
      <div class="flex gap-x-3 items-center">
        <CheckMarkIcon class="fill-green w-3.5" /> 14 unique players
      </div>
      <div class="flex gap-x-3 items-center">
        <CheckMarkIcon class="fill-green w-3.5" /> 3 similar versions
      </div>
      <div class="flex gap-x-3 items-center">
        <CheckMarkIcon class="fill-green w-3.5" /> Author participated in all games
      </div>
      <div class="flex gap-x-3 items-center">
        <CheckMarkIcon class="fill-green w-3.5" /> No bot players
      </div>
      <div class="flex gap-x-3 items-center">
        <CheckMarkIcon class="fill-green w-3.5" /> No resignations
      </div>
      <div class="flex gap-x-3 items-center">
        <CheckMarkIcon class="fill-green w-3.5" /> No aborts
      </div>
    </div>
  </div>
)
