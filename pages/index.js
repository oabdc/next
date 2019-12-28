import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux';
import store from '../store/store'
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
const Index = ({counter, userName, add, rename}) => {
    return (
        <>
            <span>Count: {counter}</span>
            <span>userName: {userName}</span>
            <input value={userName} onChange={e => {rename(e.target.value)}}/>
            <button onClick={()=> {add(counter)}}>do add</button>
        </>
    )
};
export default connect(function mapStateToProps(state) {
    return {
        counter: state.counter.count,
        userName: state.user.userName,
    }
}, function mapDispatchToProps(dispatch) {
    return {
        add: (num => dispatch({type: 'ADD', num})),
        rename: (name => dispatch({type: 'UPDATE', userName: name}))
    }
})(Index)
