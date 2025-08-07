import useExtensionRequestDialogStore from '../../hooks/useExtensionRequestDialogStore'

/**
 * `display: contents;` allows buttons to be displayed inline like a paragraph text
 *
 * https://stackoverflow.com/a/60871453
 */
function ExtensionRequestPrompt() {
  const setIsDialogOpen = useExtensionRequestDialogStore(
    (state) => state.setIsOpen
  )

  function openRequestDialog() {
    setIsDialogOpen(true)
  }

  return (
    <p>
      Your allotted time has run out.{' '}
      <button onClick={openRequestDialog} className='contents'>
        <span className='underline underline-offset-4'>
          Ask for an extension
        </span>
      </button>
    </p>
  )
}

export default ExtensionRequestPrompt
