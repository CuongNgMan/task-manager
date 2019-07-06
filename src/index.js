import m from "mongoose";
import TaskDAO from "./DAO/taskDAO";
import UserDAO from "./DAO/userDAO";
import conn, { CONNECTION_STRING, CONNECT_OPTIONS } from "./db/conn";
import TaskModel, { taskSchema } from "./model/task.model";
//DB connection event hanlder
m.connection.on("connected", () => {
  console.log(`Connected to db ${DB_NAME}`);
});

m.connection.on("error", err => {
  console.log(`Connecting to: ${CONNECTION_STRING}`);
  console.log(`Connecting error ${err}`);
});

process.on("SIGINT", () => {
  m.connection.close(() => {
    console.log(`Connection to ${DB_NAME} closed`);
    process.exit(0);
  });
});

//Connect to DB
conn
  .openUri(CONNECTION_STRING, CONNECT_OPTIONS)
  .then(async client => {
    await TaskDAO.injectDB(client);
    await UserDAO.injectDB(client);
    const test = await TaskDAO.getTasks();
    console.log(test);
    const query = TaskModel.find();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
// m.connect(CONNECTION_STRING, CONNECT_OPTIONS)
//   .catch(err => {
//     console.log(`Connecting to ${DB_NAME}`);
//     console.log(`Error: ${err}`);
//     console.log(`Connection string: ${CONNECTION_STRING}`);
//     process.exit(1);
//   })
//   .then(client => {
//     // const model = client.model('Task').find({}).then(res => {
//     //   console.log(res);
//     // })

//     const res = TaskDAO.injectDB(client).then(res => {
//       console.log(res);
//     });

//     //setting up express server
//     // app.listen(SERV_PORT, err => {
//     //   if (err) {
//     //     console.log(`Error while connecting to express on port ${SERV_PORT}`);
//     //     process.exit(2);
//     //   }
//     //   console.log(`Server is listening on port ${SERV_PORT}`);
//     // });
//   });
