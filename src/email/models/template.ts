export default function template (title: string, text: string, link: string, btnText: string) {
  return`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Password</title>
    </head>
    <body
      style="
        background-color: white;
        width: 100%;
        height: 100%;
        "
    >
      <div
        style="
        background-color: white; 
        margin: auto; text-align: center;
        border-radius: 5px;
        font-family: Roboto, sans-serif
        ">
        <div
          style="
          padding: 20px
  
        "
        >
          <div style="width: 100%">
            <h1>${title}</h1>
          </div>
          <div style="width: 75%; margin: auto">
            <p>${text}</p>
            <div
              style="
              background-color: #4155b5;
              max-width: 250px;
              margin: auto;
              border-radius: 5px;
              padding: 5px;
              margin-top: 50px;
              margin-bottom: 50px
            "
            >
              <a href="${link}"
                style="
                text-decoration: none;
                color: white;
              "
                >${btnText}</a
              >
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `
}