import express from "express"

const app = express();
const port = process.env.PORT || 8080;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.get("/", (req, res) => {
   res.send({
       data: "theSocial Rebuild API",
   });
});

app.listen(app.get("port"),() => {
    console.log(`is rocking over ${app.get("port")}`);
});