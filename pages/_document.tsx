import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://db.onlinewebfonts.com/c/b46bb1fc76216f5cd90457d0451dbee4?family=Futura+Book'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat&family=Nunito&family=Permanent+Marker&family=Playfair+Display&family=Satisfy&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
