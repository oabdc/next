import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx)
        return {
            ...props
        }
    }
    render() {
        return(
            <Html>
                <title>My App</title>
                <Head>
                    {<style>{`.test {color: red}`}</style>}
                </Head>
                <body className='test'>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )

    }
}

export default MyDocument