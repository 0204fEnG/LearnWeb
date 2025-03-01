export  const handleStopEvent = (e, handleFuc) => {
    console.log('hello')
    if (e.currentTarget !== e.target) return
    e.preventDefault()
    e.stopPropagation()
    console.log('tra!')
    handleFuc()
}