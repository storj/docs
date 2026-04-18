export function RegistrationToken({}) {
  return (
    <iframe
      src="https://registration.storj.io/iframe/"
      width="100%"
      height="350px"
      border="0"
      allowtransparency="true"
      style={{
        background: 'transparent',
        colorScheme: 'light', // Fixes the background in dark mode
      }}
    ></iframe>
  )
}
