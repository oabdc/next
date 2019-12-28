import App, { Container } from 'next/app'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux';
import MyContext from '../lib/my-context'
import Layout from '../component/Layout'
import store from '../store/store';

import testHoc from '../lib/text-hoc'

// 自定义App 继承原有App
class MyApp extends App {
    state = {
        context: 'value'
    }
    static async getInitialProps({ Component, ctx }) {
        console.log('app init')
        let pageProps;
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return  {
            pageProps
        }
    }
    render() {
        const { Component, pageProps } = this.props;
        return(
        <Container>
            <Layout>
                <Provider store={store}>
                    <MyContext.Provider value={this.state.context}>
                        <Component {...pageProps} />
                        <button onClick={()=>{this.setState({context: `${this.state.context}111`})}}>update</button>
                    </MyContext.Provider>
                </Provider>
            </Layout>
        </Container>
            )
    }

}
export default testHoc(MyApp)

