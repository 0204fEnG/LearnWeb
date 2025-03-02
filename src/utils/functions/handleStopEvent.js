export  const handleStopEvent = (e, handleFuc) => {
    if (e.currentTarget !== e.target) return
    e.preventDefault()
    e.stopPropagation()
    handleFuc(e)
}