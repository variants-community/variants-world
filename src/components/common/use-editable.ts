import { useRef } from 'preact/hooks'
import { useSignal } from '@preact/signals'

export const useEditable = <T>(data: T, updateData: (data: T) => Promise<void>) => {
  const isEditMode = useSignal(false)

  const backup = useRef(data)
  const current = useSignal(data)

  const start = () => {
    backup.current = { ...current.value }
    isEditMode.value = true
  }

  const apply = async () => {
    await updateData(current.value)
    isEditMode.value = false
  }

  const cancel = () => {
    isEditMode.value = false
    current.value = backup.current
  }

  const update = (newData: T) => {
    if (isEditMode.value) backup.current = newData
    current.value = newData
  }

  return {
    editable: current,
    update,
    editing: {
      value: isEditMode.value,
      start,
      apply,
      cancel
    }
  }
}
