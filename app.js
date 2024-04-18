import express from "express";
import { createClient } from "@supabase/supabase-js";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from 'dotenv'; 

const app = express();
dotenv.config()

const supabaseUrl = "https://zhlprgfjzrfadbdliuvm.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

// using morgan for logs
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/project", async (req, res) => {
  const { data, error } = await supabase.from("project").select();
  res.send(data);
});

app.get("/project/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("project")
    .select()
    .is("id", req.params.id);
  res.send(data);
});

app.post("/project", async (req, res) => {
  const { error } = await supabase.from("project").insert({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  if (error) {
    res.send(error);
  }
  res.send("created!!");
});

app.put("/project/:id", async (req, res) => {
  const { error } = await supabase
    .from("project")
    .update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    })
    .eq("id", req.params.id);
  if (error) {
    res.send(error);
  }
  res.send("updated!!");
});

app.delete("/project/:id", async (req, res) => {
  const { error } = await supabase
    .from("project")
    .delete()
    .eq("id", req.params.id);
  if (error) {
    res.send(error);
  }
  res.send("deleted!!");
});

app.get("/", (req, res) => {
  res.send("Hello I am working my friend Supabase <3");
});

app.get("*", (req, res) => {
  res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});
