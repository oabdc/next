import { withRouter} from 'next/router'
import Link from 'next/link'
const color = 'red';
const A = ({router, name}) =>
    <>
        <Link href="#aaa">
            <a className='link'>A{router.query.id}{name}</a>
        </Link>

        <style jsx>{`
            a{
                color: blue
            }
            .link{
                color: ${color}
            }
        `}</style>
        <style jsx global>
            {`
        a{
            color: green
        }
        `}
        </style>
    </>
    // css in js保证组件间的样式是隔离的

// pages下调用此方法才有效

A.getInitialProps = async () => {
    console.log('************')
    // 可以设置异步变化
    const promise = new Promise((resolve) => {
        setTimeout(()=>{
            resolve(
                {
                    name: 'joke'
                }
            )
        }, 500)
    })
    return await promise
}
export default withRouter(A)