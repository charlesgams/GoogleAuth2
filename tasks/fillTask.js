const axios = require("axios");

const fillTask = async (taskList, accessToken) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  let Tasks = [];

  return await new Promise((resolve, reject) => {
    taskList.forEach(async (list, index) => {
      const listTasks = await axios
        .get(
          `https://tasks.googleapis.com/tasks/v1/lists/${list.id}/tasks?fields=items.id,items.title,items.notes`
        )
        .then((res) => res)
        .catch((err) => err);

      Tasks.push({
        index,
        listId: list.id,
        listName: list.title,
        items: listTasks.data.items,
      });

      Tasks.length == taskList.length ? resolve(Tasks) : null;
    });
  });
};

module.exports = fillTask;
