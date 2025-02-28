import { useState ,useRef} from "react"
const useMyTransition = (transitionDuration) => {
    const [domIsEnter, setDomIsEnter] = useState(false)
    const [domIsRender, setDomIsRender] = useState(false)
    const domTimer = useRef(null)
    const handleDomShow = () => {
        if (!domIsRender) {
            setDomIsRender(true)
            domTimer.current = setTimeout(() => {
                setDomIsEnter(true)
            }, 0);
        }
        else {
            if (domIsEnter) {
                setDomIsEnter(false)
                domTimer.current = setTimeout(() => {
                    setDomIsRender(false)
                },transitionDuration)
            }
            else {
                clearTimeout(domTimer.current)
                setDomIsEnter(true)
            }
        }
    }
    return {
        domIsEnter,
        domIsRender,
        handleDomShow
    }
}
export default useMyTransition