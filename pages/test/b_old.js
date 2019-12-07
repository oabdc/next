import React, { 
    useState, 
    useReducer, 
    useLayoutEffect, 
    useEffect, 
    useContext,
    useRef,
} from 'react'

import myCount from '../../lib/my-context'
import myContext from '../../lib/my-context'
class MyCount extends React.Component {
    constructor() {
        super()
        this.ref = React.createRef
    }
    state = {
        count: 0
    }
    componentDidMount() {
        console.log(this.ref.current);
        this.interval = setInterval(() => {
            this.setState({count: this.state.count + 1})
        }, 1000)
    }
    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval)
        }
    }
    render() {
        return <span ref={this.ref}>{this.state.count}</span>
    }
}
// 存在原因
// state 比较复杂时 useState 改变state 是比较麻烦的
function countReducer(state, action) {
    switch (action.type) {
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default: 
            return state
    }
}

function MyCountFunc() {
    // const [count, setCount] = useState(0) // []
    const [count, dispatchCount] = useReducer(countReducer, 0)
    // setCount(1) // 改变基于一开始的值
    // setCount((c) => {c + 1}) // 改变时基于最新值
    

    // useEffect(()=> {
    //     const interval = setInterval(() => {
                // setCount(count + 1)
    //         // setCount( c => c + 1)
    //         dispatchCount({type: 'add'})
    //     }, 1000)
    //     // 组件卸载时执行
    //     return () => clearInterval(interval)   
    // }, [])
   
    const [name, setName] = useState('joke')
    // 只要有state改变 MyCountFunc就会 重新渲染， useEffect就会重新执行
    // 第二个参数 是数组 
    // 只有数组里的state改变时 才会重新执行useEffect
    // 这也是为什么 上面定时器里如果直接拿count，只能拿到初始值0， 因为useEffect传入空数组
    // 他只执行了一次， interval 闭包只保存了最初始的值
    // dom结构已生成
    useEffect(()=>{
        console.log('effect invoked')
        return () => {console.log('effect deteched')}
    }, [count])
    // dom结构未生成
    // 较少使用 如果逻辑比较复杂，执行时间较长，因为执行完成后，才会渲染页面，
    // 导致页面加载较慢，用户体验不好
    useLayoutEffect(()=>{
        console.log('useLayoutEffect invoked')
        console.log(inputRef)
        return () => {console.log('useLayoutEffect deteched')}
    
    }, [count])
    //
    const context = useContext(myContext);

    const inputRef = useRef();
    return (
        <div>
            
            <input ref={inputRef} value={name} onChange={(e)=> {setName(e.target.value)}}></input>
            <button onClick={()=>{dispatchCount({type: 'add'})}}>{count}</button>
            {/* <button></button> */}
            <p>{context}</p>
        </div>
    )
}
export default MyCountFunc