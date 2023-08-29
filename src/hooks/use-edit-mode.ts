import { useSignal } from '@preact/signals'

export const useEditMode = () => {
  const isEditMode = useSignal(false)

  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value
  }

  return { isEditMode: isEditMode.value, toggleEditMode }
}
