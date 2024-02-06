type Props = {
  disabled?: boolean
}

export const CheckMark = ({ disabled }: Props) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="16" height="12" fill={disabled ? '#dcdae0' : '#000'} />
      </svg>

      <path
        d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
        fill={disabled ? '#808080' : '#fff'}
      />
    </svg>
  )
}
