import Link from 'next/link'
import Router from 'next/router'
// router 钩子
const events = [
    'routeChangeStart',
    'routeChangeComplete',
    'routeChangeError',
    'beforeHistoryChange',
    'hashChangeStart',
    'hashChangeComplete' 
]
function makeEvent(type){
    return (...args) => {
        console.log(type, ...args)
    }
}
events.forEach(event => {
    Router.events.on(event, makeEvent(event))
})
// routeChangeStart /a/1
// beforeHistoryChange /a/1
// routeChangeComplete /a/1
export default () => {

    return (
        <>
        <span>Index</span>
        </>
    )
}
