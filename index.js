const express = require("express");
const cors = require('cors');
const app = express();
// app.use(cors())

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" }
];

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});
app.use(express.json());

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});

app.post("/user",(req,res)=>{
  const user1 = {
    id: req.body[0].id,
    name: req.body[0].name,
    role: req.body[0].role
  }

   users.push(user1);

  const user2 = {
    id: req.body[1].id,
    name: req.body[1].name,
    role: req.body[1].role
  }

   users.push(user2);

  const user3 = {
    id: req.body[2].id,
    name: req.body[2].name,
    role: req.body[2].role
  }

   users.push(user3);

res.send("user Added");

})

app.put("/users/:id", (req, res) => {

  console.log("body",req.body);
  console.log("params",req.params);
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    id: userId,
    name: req.body.name,
    role: req.body.role,
    age: req.body.age
  };

  res.send("user details modified");
});

app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});

app.patch("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.role) user.role = req.body.role;

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});