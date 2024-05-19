import React from 'react';

const UnderDevelopmentPage = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Service Under Development</title>
        <style>
          {`
            body {
              font-family: Dosis;
              background-color: #f2f2f2;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }

            .container {
              text-align: center;
            }

            h1 {
              color: #333;
            }

            p {
              color: #666;
            }

            .emoji {
              font-size: 3em;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <h1>Service Under Development</h1>
          <p>We're working hard to bring you this service. Please check back later!</p>
          <div className="emoji">🚧</div>
        </div>
      </body>
    </html>
  );
};

export default UnderDevelopmentPage;
