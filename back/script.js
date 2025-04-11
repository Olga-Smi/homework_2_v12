const { log } = require("console");
const express = require("express");
const path = require("path");

const webserver = express();

webserver.use(express.static(path.resolve(__dirname, "../front")));
webserver.use(express.urlencoded({ extended: true }));

const port = 7881;

webserver.get("/index", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../front/index.html"));
});

webserver.get("/home", (req, res) => {
  try {
    const login = req.query.login;
    const password = req.query.password;

    console.log(
      `all data: ${JSON.stringify(
        req.query
      )}, login: ${login}, password: ${password}`
    );
    const regexUpper = /[A-ZА-Я]/;
    const regexNum = /\d/;
    if (
      login.length >= 4 &&
      password.length >= 6 &&
      regexUpper.test(password) &&
      regexNum.test(password)
    ) {
      res.send("Реистрация на сайте прошла успешно!");
    } else if (login.length < 4 && password.length < 6) {
      res.send(
       `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="style.css">
            </head>
                  <body>
                        <form action="/home" method = "get">
                              <div> 
                              <p>Логин должен содержать не менее 4 символов </p>
                              <input type="text" name="login" id="name" placeholder="Введено: ${login}"> 
                              </div>
                               <div> 
                               <p>Пароль должен содержать не менее 6 символов </p>
                               <input type="password" name="password" id="password" placeholder="Введено: ${password}"> 
                               </div> 
                               <input type="submit" value="Зарегистрироваться">
                          </form>
                  </body>
        </html>`
      );
    } else if (login.length < 4) {
      res.send(
        ` <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="style.css">
            </head>
                     <body>
                          <form action="/home" method = "get">
                                <div> 
                                <p>Логин должен содержать не менее 4 символов</p>
                                <input type="text" name="login" id="name" placeholder="Введено: ${login}"> 
                                </div>
                                 <div> 
                                 <input type="password" name="password" id="password" placeholder="Введенный ранее пароль корректен"> 
                                 </div> 
                                 <input type="submit" value="Зарегистрироваться">
                          /form>
                    </body>
        </html>`
      );
    } else if (password.length < 6) {
      res.send(
        `<!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="style.css">
            </head>
                     <body>
                            <form action="/home" method = "get">
                                <div> 
                                <input type="text" name="login" id="name" placeholder="Введенный логин корректен"> 
                                </div>
                                <div>
                                <p>Пароль должен содержать не менее 6 символов</p>
                                <input type="password" name="password" id="password" placeholder="Введено: ${password}">
                                </div>
                                <input type="submit" value="Зарегистрироваться">
                            </form>
                      </body>
        </html>`
      );
    } else if (!regexUpper.test(password) || !regexNum.test(password)) {
      res.send(
        ` <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="style.css">
            </head>
                     <body>
                          <form action="/home" method = "get">
                                <div>
                                <input type="text" name="login" id="name" placeholder="Введенный логин корректен">
                                </div>
                                <div>
                                <p>Пароль должен содержать не хотя бы 1 заглавную букву и хотя бы 1 цифру</p>
                                <input type="password" name="password" id="password" placeholder="Введено: ${password}">
                                </div>
                                <input type="submit" value="Зарегистрироваться">
                            </form>
                        </body>
        </html>`
      );
    } else {
      res.status(400).send("Вообще все неправильно, заполните форму заново!");
    }
  } catch (error) {
    console.error(`Your error: ${error}`);
  }
});

webserver.listen(port, () => {
  console.log(`Webserver running on port ${port}`);
});
