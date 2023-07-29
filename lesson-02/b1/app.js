// import express from "express";

// const app = express();

// const todoList = [
//   {
//     id: "74d2e282-3229-44de-bb90-9f4d15354f04",
//     todoName: "Làm gì đó 1",
//     date: "24/07/2023",
//     status: "PENDING",
//   },
//   {
//     id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
//     todoName: "Làm gì đó 2",
//     date: "23/07/2023",
//     status: "TODO",
//   },
//   {
//     id: "36128291-709e-466f-8567-966deae2f1b2",
//     todoName: "Làm gì đó 3",
//     date: "22/07/2023",
//     status: "DOING",
//   },
//   {
//     id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
//     todoName: "Làm gì đó 4",
//     date: "21/07/2023",
//     status: "DONE",
//   },
// ];

// app.get("/api/todo-list", (req, res) => {
//   try {
//     const queryParams = req.query;
//     const getTodoByField = todoList.map((item) => {
//       let isQueryParamMatched = false;
//       if (Object.keys(queryParams).length !== 0) {
//         let mappingTodo = {};
//         for (const key in item) {
//           if (Number(queryParams[key])) {
//             isQueryParamMatched = true;
//             if (Number(queryParams[key])) {
//               mappingTodo[key] = item[key];
//             } else if (Number(queryParams[key]) === 0) {
//               const getNewItem = {
//                 ...item,
//               };
//               for (const keyOfQuery in queryParams) {
//                 delete getNewItem[keyOfQuery];
//               }
//               mappingTodo = { ...getNewItem };
//             }
//           }
//         }

//         if (!isQueryParamMatched) {
//           mappingTodo = { ...item };
//         }

//         return mappingTodo;
//       } else {
//         return item;
//       }
//     });
//     res.send({
//       data: getTodoByField,
//       message: "Thành công",
//       success: true,
//     });
//   } catch (error) {
//     res.send({
//       data: null,
//       message: error.message,
//       success: false,
//     });
//   }
// });

// app.listen(5000, () => {
//   console.log("server is running");
// });

import express from "express";

const app = express();

const todoList = [
  {
    id: "74d2e282-3229-44de-bb90-9f4d15354f04",
    todoName: "Làm gì đó 1",
    date: "24/07/2023",
    status: "PENDING",
  },
  {
    id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
    todoName: "Làm gì đó 2",
    date: "23/07/2023",
    status: "TODO",
  },
  {
    id: "36128291-709e-466f-8567-966deae2f1b2",
    todoName: "Làm gì đó 3",
    date: "22/07/2023",
    status: "DOING",
  },
  {
    id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
    todoName: "Làm gì đó 4",
    date: "21/07/2023",
    status: "DONE",
  },
];

app.get('/api/todo-list',(req,res)=> {
  const queryParams = req.query;
  const getDataConfig = todoList.map((item)=> {
    const getItem = {}
    for (const key in queryParams) {
      if(queryParams[key]){
        getItem[key] = item[key]
      } else {

      }
    }
  })
})




app.listen(5000, () => {
  console.log("server is running");
});
