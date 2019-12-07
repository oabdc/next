import React, { 
    useState, 
    useReducer, 
    useLayoutEffect, 
    useEffect, 
    useContext,
    useRef,
    Children,
    memo,
    useMemo,
    useCallback,
} from 'react'

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
    const [count, dispatchCount] = useReducer(countReducer, 0)
    const [name, setName] = useState('joke')
    // 现在只该改变了input name 值，但是 child还是重新渲染了，
// 因为 改变name值后，mycountfunc 重新渲染，进而config 重新声明

// 我们可以使用 useMemo ，包裹监听的数据，传入第二参数，count 不变 config就不重新生成
const config = useMemo(()=> ({
    text: `count is ${count}`,
    color: count > 3 ? 'red' : 'blue'
}), [count])
// onButtonClick 也是每次都重新生成匿名方法
// dispatchCount 不依赖任何方法
const handleButtonClick = useCallback(()=>{dispatchCount({type: 'add'})}, [])

const countRef = useRef()
countRef.current = count
const handleAlertButtonClick = function() {
    setTimeout(()=>{
        alert(countRef.current)
    }, 2000)
}
    return (
        <div>
            
            <input value={name} onChange={(e)=> {setName(e.target.value)}}></input>
            <Child config={config} 
            onButtonClick={handleButtonClick}
            />
            <button onClick={handleAlertButtonClick}>alert count</button>
        </div>
    )
}
// memo === shouldcomponentUpdate
// child 更新 完全取决于 传入参数是否有变化
const Child = memo(function Child ({onButtonClick, config}) {
    console.log('child render')
    return(
        <button onClick={onButtonClick} style={{color: config.color}}>
            {config.text}
        </button>
    )
})

export default MyCountFunc