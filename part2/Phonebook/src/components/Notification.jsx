const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  } else if (messageType === 'confirm') {
    return (
        <div className="confirm">
            {message}
        </div>
    )
  }
  return (
    <div className="error">
        {message}
    </div>
  )
}

export default Notification