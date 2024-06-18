import type { FunctionalComponent } from 'preact'
import type { KeyWordToHintMappings } from 'components/AdvancedSearch/use-computed-hints'

export const createHelpHintBox = (mappings: KeyWordToHintMappings) => {
  return <HelpHintBox mappings={mappings} />
}

export const HelpHintBox: FunctionalComponent<{
  mappings: KeyWordToHintMappings
}> = ({ mappings }) => {
  const hints = Object.keys(mappings).map(key => ({ key, description: mappings[key].helpDescription }))

  return (
    <div class="p-2 mt-2">
      <table class="table-fixed">
        <thead>
          <tr>
            <th class="text-left">key</th>
            <th class="text-left">description</th>
          </tr>
        </thead>
        <tbody class="">
          {hints.map(hint => (
            <tr class="my-2">
              <td class="pr-4 py-0.5 font-semibold">
                <span class="tag py-0.5">{hint.key}</span>
              </td>
              {hint.description && <td>{hint.description}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
