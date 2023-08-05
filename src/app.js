import express from "express";
import { engine } from 'express-handlebars';
import {__dirname} from "./utils.js";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initPassport } from "./config/passport.config.js";
import {config} from "./config/config.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./utils/logger.js";
//import { transporter } from "./config/email.js";

import { viewsRouter } from "./routes/views.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import {productsRouter} from "./routes/products.routes.js";
import {cartsRouter} from "./routes/carts.routes.js";
import { emailRouter } from "./routes/email.routes.js";
import { mockingproductsRouter } from "./routes/mockingproducts.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { testRouter } from "./routes/test.routes.js";


const port = config.server.port;
const app =express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(cors());

app.listen(port,()=>logger.info(`Server listening on port ${port}`));

//configuración de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//configuración de la sesion
app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongo.url
    }),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true,
}));

//configuración de passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/email-coder", emailRouter);
app.use ("/api/mockingproducts", mockingproductsRouter);
app.use ("/api/user", userRouter);
app.use ("/loggerTest", testRouter);
app.use (errorHandler);




/*const emailTemplate = `<div>
        <h1>Bienvenido!!</h1>
        <img src="https://t4.ftcdn.net/jpg/02/59/09/37/360_F_259093785_4xKtZVIi2LgS7hIz8WZ9B9qQmdwDpFyk.jpg" style="width:250px"/>
        <p>Ya puedes empezar a usar nuestros servicios</p>
        <a href="https://www.google.com/">Explorar</a>
</div>`;


//Definir la estructura del correo
const mailOptions = {
    from:"ecommerce",
    to:"bgutierrez.mil@gmail.com",
    subject:"Registro exitoso con imagen",
    html:emailTemplate,
    
};

//ruta para enviar el correo
app.post("/email-coder",async(req,res)=>{
    try{
        //usar el transports con la estructura del correo
        const info = await transporter.sendMail(mailOptions);
        console.log("info: ", info);
        res.json({status:"success", message:`Correo enviado a ${mailOptions.to}`});
    }catch(error){
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al enviar el correo"});
    }
});*/