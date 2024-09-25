

export const filterTasksByQuery = (tasks, query) => {
    if (!query) return tasks;
  
    return tasks.filter(
      (task) =>
        task.text.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
    );
  };
  
  export const filterTasksByRoute = (tasks, pathname) => {
    switch (pathname) {
      case "/completed":
        return tasks.filter((task) => task.completed);
      case "/uncompleted":
        return tasks.filter((task) => !task.completed);
      case "/important":
        return tasks.filter((task) => task.important);
      case "/todaytask":
        const today = new Date().toISOString().split("T")[0];
        return tasks.filter((task) => task.creationDate === today);
      case "/allTask":
      default:
        return tasks;
    }
  };
  